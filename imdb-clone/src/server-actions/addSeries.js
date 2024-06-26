'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addSeries(formData) {
    const user_id = formData.get('user_id')
    const name = formData.get('name')
    const streaming_service = formData.get('streaming_service')
    const seasons = formData.get('seasons')
    const episodes_per_season = formData.get('episodes_per_season')
    const category = formData.get('category')
    const stars = formData.get('stars')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user

    if (!user) {
        console.error('User is not authenticated within addSeries server action')
        return;
    }

    const { data, error } = await supabase
        .from('series')
        .insert([
            {
                user_id: user_id,
                name: name,
                streaming_service: streaming_service,
                seasons: seasons,
                episodes_per_season: episodes_per_season,
                category: category,
                stars: stars,
                user_id: user.id
            }
        ])

    if (error) {
        console.error('Error inserting data', error)
        return;
    }

    revalidatePath('/series-list')

    return { message: 'Success' }
}
