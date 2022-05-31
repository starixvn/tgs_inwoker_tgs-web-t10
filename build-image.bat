docker login registry.gitlab.com -u lester.wei@rayprosoft.com
docker build -t registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t10:dev .
docker push registry.gitlab.com/rayprosoft/turnkey-gaming-system/lobby-t10:dev
pause