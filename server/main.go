package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := ":80" // production port:80, development: any port you want
	// gin.SetMode(gin.ReleaseMode) // for production only

	//  Display basic information
	startupCode()

	// Ensure the 'upload' directory exists; create it if not present
	makeUploadDir()

	// Create a Gin router
	r := gin.Default()

	// Apply Cross-Origin Resource Sharing (CORS) middleware
	r.Use(cors.Default())

	// Load the HTML file for the web application
	// r.LoadHTMLFiles("dist/index.html")   // Load HTML file
	// r.Static("/assets", "./dist/assets") // Load static assets

	// Define routes and handlers
	r.GET("/", htmlHandler)          // Respond with HTML content to clients
	r.GET("/status", statusHandler)  // Check the status of the server
	r.POST("/upload", uploadHandler) // Handle uploaded files

	// Start the server on port 80
	log.Fatal(r.Run(port))
}

// Route Handlers
// Start
func htmlHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title": "Page Title",
	})
}

func statusHandler(c *gin.Context) {
	makeUploadDir()
	c.JSON(200, gin.H{
		"status": "success",
	})
}

// uploadHandler handles file uploads via a web request.
func uploadHandler(c *gin.Context) {
	// Get the uploaded file from the request form
	file, _ := c.FormFile("file")

	// Specify the destination directory for file storage (in this case, it's "./upload/") and save the uploaded file
	c.SaveUploadedFile(file, "./upload/"+file.Filename)

	// Respond to the client with a success status message
	c.JSON(200, gin.H{
		"status": "success",
	})
}

// Route handler over

/////////////////
////// Helper functions
////////////////

// makeUploadDir checks if the 'upload' directory is present. If it's not present, it creates a new one.
func makeUploadDir() {
	// Check if the 'upload' directory exists
	if _, err := os.Stat("upload"); os.IsNotExist(err) {
		// If the directory does not exist, create it with permissions set to 0755.
		errDir := os.MkdirAll("upload", 0755)
		if errDir != nil {
			// If there is an error creating the directory, log the error and stop execution.
			log.Fatal(errDir)
		}
	}
}

// getHostAndIP retrieves the hostname and a list of non-loopback IPv4 addresses associated with the system.
func getHostAndIP() (string, []string, error) {
	// Get the hostname of the system
	name, err := os.Hostname()
	if err != nil {
		return "", nil, fmt.Errorf("Oops! Something went wrong while getting the hostname: %v", err)
	}

	// Initialize a slice to store the IPv4 addresses
	var ips []string

	// Get a list of network interface addresses
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", nil, fmt.Errorf("Oops! Something went wrong while getting interface addresses: %v", err)
	} else {
		// Iterate through the interface addresses
		for _, addr := range addrs {
			if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
				// Check if the address is an IPv4 address and not a loopback address
				if ipnet.IP.To4() != nil {
					// If it's an IPv4 address, add it to the list
					ips = append(ips, ipnet.IP.String())
				}
			}
		}
	}

	// Return the hostname and the list of non-loopback IPv4 addresses, with no error
	return name, ips, nil
}

// startupCode is responsible for  displaying important information.
func startupCode() {
	// Print a message indicating that the server is ready
	fmt.Println("Server is ready")
	fmt.Println("Visit any of the following links:")

	// Call the getHostAndIP function to retrieve the hostname and IP addresses
	name, ips, err := getHostAndIP() // get host name and ip address
	if err != nil {
		// If there was an error getting the hostname and IP addresses, print the error message
		fmt.Println(err)
	} else {
		// If there were no errors, display the hostname and each IP address as a link
		fmt.Printf("http://%s/\n", name)
		for _, ip := range ips {
			fmt.Printf("http://%s/\n", ip)
		}
	}
}
