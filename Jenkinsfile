pipeline {
    agent {
        label "jenkin-agent"
    }
    stages {
        stage("Cleanup Workspace") {
            steps {
                cleanWs()
            }
        }
        stage("Checkout from SCM") {
            steps {
                git branch: 'develop', credentialsId: 'github', url: 'https://github.com/mtriwardanaa/nodejs-jenkins'
            }
        }
    }
}
