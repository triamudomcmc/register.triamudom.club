# build in full image
FROM golang:latest AS builder
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# run in slim image
FROM alpine:3.9
WORKDIR /app
COPY --from=builder /app/main /app/
EXPOSE 1323
CMD ["./main"]