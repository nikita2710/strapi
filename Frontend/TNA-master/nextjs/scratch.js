return <Layout>
    <center>
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap'
        }}>
            {props.images.map((image, index) => (
                <figure style={{ width: '50%', flexDirection: 'column' }}>
                    <img
                        src={image.src}
                    />
                    <figcaption>
                        <h6 style={{ color: "white" }} >{image.caption}</h6></figcaption>
                </figure>
            ))}
        </div>
    </center>
</Layout>