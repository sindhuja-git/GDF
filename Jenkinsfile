node('master') {
        env.NAMESPACE = readFile('/var/run/secrets/kubernetes.io/serviceaccount/namespace').trim()
}

library identifier: 'hp-pipeline-library@master', retriever: modernSCM(
        [$class: 'GitSCMSource', remote: 'ssh://git@git.healthpartners.com/paas/hp-pipeline-library.git',
        credentialsId: "${env.NAMESPACE}-bitbucketsecret"]
)

hpPipeline([
    appName: 'gdf-viewer-ui',
    type: 'npm-web-server',
    appDir: '.',
    dist: 'dist/',
    type: 'npm-web-server',
    steps: ['prettier:check', 'lint', 'test:coverage', 'build'],
    skipIntegrationTests: ['dev2'],
    autoCreateChange: true,	
    assignmentGroup: 'HPS - Cornerstone',
    group: 'admin-systems',
    cmdb_item: 'HPS - Group Setup Services',
    useLatestStaticScanners: true,
    team: 'Cornerstone',
    openshift: [
        route: [ host: 'gsu-gdf', path: '/'],
        simpleRoute: [ host: 'gsu-gdf', path: '/'],
        environmentSkipApproval: ['dev2', 'uat4', 'prd4'],
        targetEnvironments: ['dev2', 'uat3', 'uat4', 'prd3', 'prd4'],
    ]
])


