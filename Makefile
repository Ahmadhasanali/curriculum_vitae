deploy:
	docker compose -f docker-compose.prod.yml up -d

dev:
	docker compose -f docker-compose.yml up -d

down:
	docker compose -f docker-compose.prod.yml down

down-dev:
	docker compose -f docker-compose.yml down

.PHONY: deploy dev down down-dev
