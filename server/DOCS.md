# Docs

**Read This Important**

```go
// Important Note: Make the following changes for production use.

// Uncomment the following line to enable Production mode
// By default, this is commented out
gin.SetMode(gin.ReleaseMode) // for production only
```

```go
// Note: This code assumes that the 'dist' directory exists; if not, it will cause an error.
// Enable this only in production.

// Load the HTML file for the web application
r.LoadHTMLFiles("dist/index.html")   // Load HTML file
r.Static("/assets", "./dist/assets") // Load static assets
```

Please make sure to uncomment the line for production mode and ensure that the 'dist' directory exists when using this code in a production environment.

## Code Logic

1. `startupCode()` displays important server information, such as the server URL.
2. `makeUploadDir()` creates an upload directory if it doesn't exist.
3. `r := gin.Default()` creates a Gin router.
4. `r.Use(cors.Default())` applies Cross-Origin Resource Sharing (CORS) middleware.
5. Defines routes that can handle requests; see the code for details.
6. `log.Fatal(r.Run(port))` starts the server on the specified port. You can change the port according to your needs.

## Functions

```go
// As a Go developer, you are already familiar with this main function.
func main() {
    // ...
}
```

```go
// makeUploadDir checks if the 'upload' directory is present. If it's not present, it creates a new one.
func makeUploadDir() {
    // ...
}
```

```go
// getHostAndIP retrieves the hostname and a list of non-loopback IPv4 addresses associated with the system.
func getHostAndIP() (string, []string, error) {
    // ...
}
```

```go
// Provides essential server information to display.
func startupCode() {
    // ...
}
```

## Main function `func main(){}`

```go
func main() {
	port := ":80"                // production port:80, development: any port you want
	gin.SetMode(gin.ReleaseMode) // for production only

	//  Display basic information
	startupCode()

	// Ensure the 'upload' directory exists; create it if not present
	makeUploadDir()

	// Create a Gin router
	r := gin.Default()

	// Apply Cross-Origin Resource Sharing (CORS) middleware
	r.Use(cors.Default())

    // Only enable in production
	// by default it is commented
	// Load the HTML file for the web application
	r.LoadHTMLFiles("dist/index.html")   // Load HTML file
	r.Static("/assets", "./dist/assets") // Load static assets

	// Define routes and handlers
	r.GET("/", htmlHandler)          // Respond with HTML content to clients
	r.GET("/status", statusHandler)  // Check the status of the server
	r.POST("/upload", uploadHandler) // Handle uploaded files

	// Start the server on port 80
	log.Fatal(r.Run(port))
}
```

## Route Handlers

```go
// Define routes and handlers
r.GET("/", htmlHandler)          // Respond with HTML content to clients
r.GET("/status", statusHandler)  // Check the status of the server; server is working or not
r.POST("/upload", uploadHandler) // Handle uploaded files

```

```go
// handle request for /
// respond with html content
func htmlHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title": "Page Title",
	})
}
```

```go
func statusHandler(c *gin.Context) {
	makeUploadDir()
	c.JSON(200, gin.H{
		"status": "success",
	})
}
```

```go
// uploadHandler handles file uploads via a web request.
func uploadHandler(c *gin.Context) {
	// Get the uploaded file from the request form
	file, _ := c.FormFile("file")

	// Specify the destination directory for file storage (in this case, it's "./upload/") and save the uploade file
	c.SaveUploadedFile(file, "./upload/"+file.Filename)

	// Respond to the client with a success status message
	c.JSON(200, gin.H{
		"status": "success",
	})
}
```
