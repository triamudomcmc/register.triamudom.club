# build in full image
FROM golang:latest AS builder
WORKDIR /go/src/app
RUN go get -u github.com/golang/dep/cmd/dep
COPY ./main.go /go/src/app
COPY ./Gopkg.toml /go/src/app
RUN dep ensure 
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# run in slim image
FROM alpine:3.9
WORKDIR /app
COPY --from=builder /go/src/app/main /app/
EXPOSE 1323
CMD ["./main"]
