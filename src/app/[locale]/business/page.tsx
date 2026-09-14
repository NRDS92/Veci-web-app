import PublicBusinesses from "@/components/public-content/businesses/PublicBusinesses";


export default function BusinessPage() {

    console.log(
        "🔥 BUSINESS PAGE RENDER"
    );


    return (

        <main className="min-h-screen">

            <PublicBusinesses
                limit={12}
            />

        </main>

    );

}