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
        "@context": "https://schema.org",

        "@type": "Event",

        name:
            event.title,

        description:
            event.description,

        startDate:
            event.dateStart,

        ...(event.dateEnd && {
            endDate:
                event.dateEnd,
        }),

        eventStatus:
            "https://schema.org/EventScheduled",

        eventAttendanceMode:
            "https://schema.org/OfflineEventAttendanceMode",

        url,

        ...(event.images &&
            event.images.length > 0 && {
                image:
                    event.images,
            }),

        location: {

            "@type":
                "Place",

            name:
                event.cityId,

            address:
                event.address,

            ...(event.location && {
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
            }),

        },

        ...(event.createdBy && {
            organizer: {

                "@type":
                    "Person",

                name:
                    event.createdBy.name,

            },
        }),

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