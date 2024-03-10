pipeline {
    agent {
        label "jenkins-agent"
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
        stage('SonarQube Analysis') {
            environment {
                SCANNER_HOME = tool 'sonarqube-scanner-latest';    
            }
            
            steps {
                script {
                    withSonarQubeEnv(credentialsId: 'jenkins-sonarqube-token') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner"
                    }
                }
            }
        }
    }
}
