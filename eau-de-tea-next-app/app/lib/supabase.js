import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


// ★ 범인 색출용 로그 (터미널과 브라우저 콘솔에서 확인 가능)
console.log('--- Supabase 설정 확인 ---');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? '키가 있음' : '키가 없음(undefined)');
console.log('-------------------------');

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL 또는 Key가 .env.local 파일에서 로드되지 않았습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);


