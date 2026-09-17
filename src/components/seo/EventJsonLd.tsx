interface EventJsonLdProps {
    event: {
        _id: string;
        title: string;
        description?: string;

        images?: string[];

        cityId: string;

        address: string;

        dateStart: string;

        dateEnd?: string;

        location?: {
            type: "Point";
            coordinates: [number, number];
        };

        createdBy?: {
            _id: string;
            name: string;
        };
    };

    url: string;
}


export default function EventJsonLd({
    event,
    url,
}: EventJsonLdProps) {

    const jsonLd = {

        "@context":
            "https://schema.org",

        "@type":
            "Event",


        /* =====================================================
           BASIC EVENT INFORMATION
        ===================================================== */

        name:
            event.title,


        ...(event.description
            ? {
                description:
                    event.description,
            }
            : {}
        ),


        /* =====================================================
           DATE
        ===================================================== */

        startDate:
            event.dateStart,


        ...(event.dateEnd
            ? {
                endDate:
                    event.dateEnd,
            }
            : {}
        ),


        /* =====================================================
           EVENT STATUS
        ===================================================== */

        eventStatus:
            "https://schema.org/EventScheduled",


        eventAttendanceMode:
            "https://schema.org/OfflineEventAttendanceMode",


        /* =====================================================
           CANONICAL EVENT URL
        ===================================================== */

        url,


        /* =====================================================
           EVENT IMAGE
        ===================================================== */

        ...(event.images &&
            event.images.length > 0
            ? {
                image:
                    event.images,
            }
            : {}
        ),


        /* =====================================================
           LOCATION
        ===================================================== */

        location: {

            "@type":
                "Place",


            name:
                event.cityId,


            address: {

                "@type":
                    "PostalAddress",


                ...(event.address
                    ? {
                        streetAddress:
                            event.address,
                    }
                    : {}
                ),


                ...(event.cityId
                    ? {
                        addressLocality:
                            event.cityId,
                    }
                    : {}
                ),

            },


            /* =============================================
               GEO COORDINATES

               GeoJSON coordinates are:
               [longitude, latitude]
            ============================================= */

            ...(event.location
                ? {
                    geo: {

                        "@type":
                            "GeoCoordinates",


                        longitude:
                            event.location
                                .coordinates[0],


                        latitude:
                            event.location
                                .coordinates[1],

                    },
                }
                : {}
            ),

        },


        /* =====================================================
           ORGANIZER
        ===================================================== */

        ...(event.createdBy
            ? {

                organizer: {

                    "@type":
                        "Person",


                    name:
                        event.createdBy.name,

                },

            }
            : {}
        ),


        /* =====================================================
           MAIN ENTITY
        ===================================================== */

        mainEntityOfPage: {

            "@type":
                "WebPage",


            "@id":
                url,

        },

    };


    return (

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html:
                    JSON.stringify(
                        jsonLd
                    ).replace(
                        /</g,
                        "\\u003c"
                    ),
            }}
        />

    );

}