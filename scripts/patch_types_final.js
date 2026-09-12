import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/integrations/supabase/types.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const tables = ['content_items', 'notes', 'quizzes', 'progress_tracking'];

for (const table of tables) {
    const tableIndex = content.indexOf(`\n      ${table}: {`);
    if (tableIndex === -1) continue;

    const rowIdx = content.indexOf(`\n        Row: {`, tableIndex);
    const insertIdx = content.indexOf(`\n        Insert: {`, rowIdx);
    const updateIdx = content.indexOf(`\n        Update: {`, insertIdx);
    const endIdx = content.indexOf(`\n        Relationships:`, updateIdx);

    let tableStr = content.substring(rowIdx, endIdx);

    // strictly add right after unit_id
    tableStr = tableStr.replace(/(\s+)unit_id: string;/g, `$1topic_id?: string | null;$1unit_id: string;`);
    tableStr = tableStr.replace(/(\s+)unit_id\?: string;/g, `$1topic_id?: string | null;$1unit_id?: string;`);
    tableStr = tableStr.replace(/(\s+)unit_id: string \| null;/g, `$1topic_id?: string | null;$1unit_id: string | null;`);
    tableStr = tableStr.replace(/(\s+)unit_id\?: string \| null;/g, `$1topic_id?: string | null;$1unit_id?: string | null;`);

    content = content.substring(0, rowIdx) + tableStr + content.substring(endIdx);
}

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
console.log('patched tightly.');
