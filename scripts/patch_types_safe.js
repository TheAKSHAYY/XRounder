import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/integrations/supabase/types.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// We just need to replace the exact strings for each table.
// Because Supabase types format is predictable, we can search for the properties.

function addTopicId(content, tableName) {
    const tableStart = content.indexOf(`\n      ${tableName}: {`);
    if (tableStart === -1) return content;
    const tableEnd = content.indexOf(`\n      };`, tableStart);
    if (tableEnd === -1) return content;
    
    let tableStr = content.substring(tableStart, tableEnd);
    
    // Add to Row
    tableStr = tableStr.replace(/(\n\s+unit_id: string( \| null)?(;|,))/, `\n          topic_id: string | null;$1`);
    // Add to Insert
    tableStr = tableStr.replace(/(\n\s+unit_id: string( \| null)?(;|,))/g, (match, p1, offset, fullString) => {
        // We only want to replace the second one (Insert) and third (Update)
        // Let's be explicit
        return match; 
    });
    
    // Actually, instead of regex, let's split by 'Row: {', 'Insert: {', 'Update: {'
    const parts = tableStr.split(/(Row: {|Insert: {|Update: {)/);
    // parts[0] = "  tableName: { "
    // parts[1] = "Row: {"
    // parts[2] = " ... unit_id: string; ... "
    // parts[3] = "Insert: {"
    // parts[4] = " ... unit_id: string; ... "
    // parts[5] = "Update: {"
    // parts[6] = " ... unit_id?: string; ... "
    
    for (let i = 2; i < parts.length; i += 2) {
        if (parts[i - 1] === 'Row: {') {
            parts[i] = parts[i].replace(/unit_id: string( \| null)?(;|,)/, `topic_id: string | null;\n          unit_id: string$1$2`);
        } else if (parts[i - 1] === 'Insert: {') {
            parts[i] = parts[i].replace(/unit_id: string( \| null)?(;|,)/, `topic_id?: string | null;\n          unit_id: string$1$2`);
        } else if (parts[i - 1] === 'Update: {') {
            parts[i] = parts[i].replace(/unit_id\?: string( \| null)?(;|,)/, `topic_id?: string | null;\n          unit_id?: string$1$2`);
        }
    }
    
    content = content.substring(0, tableStart) + parts.join('') + content.substring(tableEnd);
    return content;
}

content = addTopicId(content, 'content_items');
content = addTopicId(content, 'notes');
content = addTopicId(content, 'quizzes');
content = addTopicId(content, 'progress_tracking');

// Add syllabus_topics
const newTable = `
      syllabus_topics: {
        Row: {
          id: string;
          unit_id: string;
          title: string;
          sort_order: number;
          status: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          unit_id: string;
          title: string;
          sort_order?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          unit_id?: string;
          title?: string;
          sort_order?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "syllabus_topics_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          }
        ]
      };`;

if (!content.includes('syllabus_topics: {')) {
    content = content.replace(/Tables:\s*{/, `Tables: {${newTable}`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('types.ts successfully patched.');
