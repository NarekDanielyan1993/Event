import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import createEmotionServer from '@emotion/server/create-instance';

import { createEmotionCache } from 'utils';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initalProps = await Document.getInitialProps(ctx);

        return initalProps;
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });
    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            dangerouslySetInnerHTML={{ __html: style.css }}
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
        />
    ));

    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...emotionStyleTags,
        ],
    };
};

export default MyDocument;
