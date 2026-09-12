import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/integrations/supabase/types.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Add topic_id to tables
const tablesToUpdate = ['content_items', 'notes', 'quizzes', 'progress_tracking'];

tablesToUpdate.forEach(table => {
    // We look for the start of the table definition inside `Tables: {`
    // Example: content_items: { Row: { ... }, Insert: { ... }, Update: { ... } }
    
    // Quick regex to insert topic_id in Row, Insert, and Update blocks
    const rowRegex = new RegExp(`(${table}:\\s*{\\s*Row:\\s*{[^}]*)(\\n\\s*updated_at: string;|\\n\\s*updated_at\\?: string;)`);
    const insertRegex = new RegExp(`(${table}:\\s*{\\s*Row:[^{}]*{[^{}]*}\\s*;?\\s*Insert:\\s*{[^}]*)(\\n\\s*updated_at\\?:)`);
    const updateRegex = new RegExp(`(${table}:\\s*{\\s*Row:[^{}]*{[^{}]*}\\s*;?\\s*Insert:[^{}]*{[^{}]*}\\s*;?\\s*Update:\\s*{[^}]*)(\\n\\s*updated_at\\?:)`);
    
    // Replace by finding the property right before the end of the block, or just insert it after `id`
    // Let's use a simpler approach: replace "unit_id: string" with "topic_id: string | null;\n          unit_id: string"
    // For Row:
    content = content.replace(new RegExp(`(${table}:[\\s\\S]*?Row:[\\s\\S]*?)(unit_id: string( \\| null)?;)`), `$1topic_id: string | null;\n          $2`);
    // For Insert:
    content = content.replace(new RegExp(`(${table}:[\\s\\S]*?Insert:[\\s\\S]*?)(unit_id: string( \\| null)?(;|,))`), `$1topic_id?: string | null;\n          $2`);
    // For Update:
    content = content.replace(new RegExp(`(${table}:[\\s\\S]*?Update:[\\s\\S]*?)(unit_id\\?: string( \\| null)?(;|,))`), `$1topic_id?: string | null;\n          $2`);
});

// Add syllabus_topics definition
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

// Insert new table just after 'Tables: {'
content = content.replace(/Tables:\s*{/, `Tables: {${newTable}`);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('types.ts successfully patched.');
