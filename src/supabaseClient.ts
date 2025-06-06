import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ogmxiugmfkyunbqyyjed.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbXhpdWdtZmt5dW5icXl5amVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjg3ODEsImV4cCI6MjA2NDgwNDc4MX0.BsrSvY6DcrovtjKle4b81A-2mJc8TJL04OlXrjSYylQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
