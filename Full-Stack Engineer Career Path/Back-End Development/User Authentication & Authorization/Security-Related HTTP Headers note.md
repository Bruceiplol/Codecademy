# HTTP Security Header
- HTTP responses can contain headers with extra information that tells the client (browser) how to behave.
- Security-related headers are added in server-to-client responses to reflect a policy that the website wants to implement
-  like enforcing HTTPS communications over HTTP
-  Having security headers configured well also increases a website’s trustworthiness, which in turn makes it rank higher in web searches (SEO).

## Common Security Headers
### Strict-Transportation-Security
- This header lets the server tell the browser that only the HTTPS version of the requested site is available.
-  This enforces the use of HTTPS, which is encrypted compared to plain HTTP, ensuring that all communication between the client and the server occurs on a more secure transport layer.
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
- The includeSubDomains value tells the browser that the current site, including all of its sub-domains, is HTTPS-only.
- The max-age field tells the browser to remember this for the next year (31536000 seconds = 1 year), reducing redirect responses to the HTTPS version of the site in the future.

### Content-Security-Policy
- Content-Security-Policy defines an allowlist of sources of content.
- This restricts the assets that the browser can load while they’re on the current website.
```
Content-Security-Policy: script-src 'self';
```
- The script-src option restricts which resources JavaScript can be loaded from.
- The self value indicates that the browser should only run scripts from the current domain.

### X-Frame-Options
- This header stops the current page from being hidden in an <iframe> tag in another site’s HTML.
```
X-Frame-Options: DENY                             //means your page can’t be hidden in an iframe anywhere
X-Frame-Options: SAMEORIGIN                       // only allows this page to be put into an iframe within your own domain.
X-Frame-Options: ALLOW-FROM https://example.com   //lets you list sites that are allowed to put the current content in an iframe.
```

---
## How to Add Security Headers
- Headers can be added and removed in configuration files for servers.

#### nginx
- an nginx server’s config file to add
```
add_header strict-transport-security 'max-age=31536000; includeSubDomains always;'
```

#### Apache
- Apache server’s config file located at /etc/httpd/conf/httpd.conf:
```
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

#### Microsoft IIS
- Web.config file’s <httpProtocol> section
```
<system.webServer>
  ...

  <httpProtocol>
    <customHeaders>
      <add name="Content-Security-Policy" value="default-src 'self';" />
    </customHeaders>
  </httpProtocol>

  ...
</system.webServer>
```

---
## Checking Security Headers
You can use https://securityheaders.com/ to check which headers are active on your web address.
