module.exports = {
    title: 'workflow tests',
    tagline: 'Tests',
    url: 'https://luitjens-test-gh-app.github.io',
    baseUrl: '/docs-workflow-test/',
    organizationName: 'luitjens-test-gh-app',
    projectName: 'test-workflows',
    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/docs-workflow-test/js/copy-code-block.js'
    ],
    stylesheets: [
        {
            href: '/docs-workflow-test/css/custom.css',
            type: 'text/css',
            rel: 'stylesheet'
        }
    ],
    favicon: 'img/favicon.png',
    customFields: {
        docsUrl: 'docs',
    },
    onBrokenLinks: 'log',
    onBrokenMarkdownLinks: 'log',
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    path: '../docs',
                    sidebarPath: '../website/sidebars.json'
                },
                blog: {
                    path: 'blog'
                },
                theme: {
                    customCss: './src/css/customTheme.css'
                }
            }
        ]
    ],
    plugins: [],
    markdown: {
        mermaid: true,
        parseFrontMatter: async (params) => {
            // Wrap title value in double quotes if it has illegal character ':'
            if (params?.fileContent.startsWith('---\n' + 'title: ')) {
                const lines = params.fileContent.split('\n');
                const titleLine = lines[1];
                const lineParts = titleLine.split(':');
                if (lineParts.length > 2) { // there are 2 or more colons
                    let lineValue = titleLine.slice(7);
                    if (lineValue && lineValue.includes(':')) {
                        lineValue = `"${lineValue}"`;
                        lines[1] = `${lineParts[0]}: ${lineValue}`;
                        params.fileContent = lines.join('\n');
                    }
                }
            }
            const result = await params.defaultParseFrontMatter(params);
            return result;
        }

    },
    themes: ['@docusaurus/theme-mermaid'],
    themeConfig: {
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'Workflow Tests',
            logo: {
                src: 'img/logo.png'
            },
            items: [
                {
                    to: '/help',
                    label: 'Help',
                    position: 'left'
                }
            ]
        },
        image: 'img/docusaurus.png',
        footer: {
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'README',
                            to: './README',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Peter Luitjens`,
            logo: {
                src: 'img/logo.png'
            }
        },
        mermaid: {
            theme: {
                light: 'default',
                dark: 'dark'
            },
        }
    }
};
