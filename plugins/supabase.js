import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PUBLIC_URL
// const supabaseAnonKey = process.env.SUPABASE_PUBLIC_KEY

export const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMyMzgyOTcxLCJleHAiOjE5NDc5NTg5NzF9.8plp6M2SVulpCmGEjrG1zv10Fe0f6tFpr8_R58xENMg')

export default ({ app }, inject) => {
    // Can be accessed via this.$firebase in components etc.
    inject('supabase', supabase);

    const commonFunctions = {
        async getImageForFile(fileName) {
            const bucketName = 'public';
            console.log(fileName);
            return await supabase.storage.from(bucketName).download(fileName).then(res => {
                const url = res.data;
                return url;
            });
        }
    }

    inject('test', commonFunctions)
};
