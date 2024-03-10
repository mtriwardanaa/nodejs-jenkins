pipeline {
    agent {
        label "jenkin-agent"
    }
    stages {
        stage("checkout") {
            steps {
                checkout scm
            }
        }
    }

    stage("run") {
        steps {
            sh 'docker-compose up -d'
        }
    }
}
