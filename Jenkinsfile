pipeline {
    agent any
    tools {
        nodejs "local"
    }

    stages {
        stage("Initialize"){
            steps {
                git url:"https://github.com/AhmedAyachi/SNAMarket-Server",branch:"beta"
                script {
                    def commit = sh(script:"git log -1 --oneline",returnStdout:true)
                    currentBuild.displayName=commit
                }
            }
        }
        stage("Update Docker Image"){
            steps {
                sh """
                    docker build -t ahmedayachi/snamarket-server:latest .
                    docker push ahmedayachi/snamarket-server:latest
                """
            }
        }
    }
}
