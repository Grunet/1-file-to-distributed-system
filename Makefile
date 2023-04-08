start:
	docker compose up
stop:
	docker compose down
remove:
	docker rm -vf $(docker ps -aq)
	docker rmi -f $(docker images -aq)