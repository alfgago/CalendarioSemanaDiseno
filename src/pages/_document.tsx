import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-FCMPLFX5ST`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js',new Date());

                gtag('config','G-FCMPLFX5ST');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript /> 
        </body> 
      </Html>
    )
  }

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
