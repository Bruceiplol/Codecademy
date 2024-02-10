# Open Web Application Security Project (OWASP)
-  Top Ten is a collection of the ten most serious vulnerabilities for web applications.

### Injection
- Injection is when an attacker injects malicious code into an interpreter in order to gain access to information or damage a system.
- inserting malicious characters into an input field
- Interpreters for query languages such as SQL are a common target

### Broken Authentication
- Broken Authentication is a broad term for vulnerabilities that allow attackers to impersonate other users.
- Vulnerabilities like insecure default credentials, lack of rate limiting for login attempts, and session hijacking all fall into this category.
- There is no single cure for broken authentication; web developers and security teams need to be diligent in making sure that they follow the best practices for the technologies they’re using.

### Sensitive Data Exposure
- The stolen information gets sold and resold on the dark web, often ending up in sets of personal information known as fullz
- Fullz contain information someone could use to commit the kinds of fraud
- Sensitive Data Exposure refers to insufficient protections being put in place for that data.
- covers things like insecure storage, the transmission of sensitive data, or revealing sensitive data to unauthorized parties.

### XML External Entities (XXE)
- XML External Entities (XXE) is a type of vulnerability that allows maliciously crafted data to produce unintended behavior on the backend of a website.
- XXE involves an attacker uploading a maliciously crafted XML file.
- XML is a markup language that supports potentially insecure features, and if a website is using an XML processor with those features enabled, an attacker can use XXE to wreak havoc.
- While XXE can be mitigated by ensuring XML processors are properly configured and updated, and that input is validated before processing, the simplest solution is to not use XML.

### Broken Access Control
- Broken Access Control is when authorization is improperly enforced, allowing users access to privileges they should not have.
- This category is more about vulnerabilities within the authorization system than it is about bypassing the system entirely.
- Broken access control has no single method of mitigation. Mitigation can involve things like rate limits for logins, ensuring server-side validation of requests, and implementing default-deny for permissions.

### Security Misconfiguration
- Forgetting to protect cloud storage
- Leaving unnecessary features enabled on server software
- Disabling automatic updates
- Displaying overly detailed error messages that give details about the way the backend is set up
- improperly configured security software, such as weak or ineffective rules for Firewalls and Intrusion Detection Systems (IDSs).
- Preventing security misconfiguration requires regular review of configurations.

### Cross-Site Scripting (XSS)
- Hackers crafted a self-sharing post that would rapidly spread and install malware on anyone’s device who viewed it
- Cross-Site Scripting (XSS) is a web vulnerability that targets the browser-side of the website, rather than the server-side.
- It usually happens when a website allows user input without sanitizing and unarming dangerous input.
- Preventing XSS involves making sure that special characters like <, >, ", =, and more are properly escaped to prevent a browser from parsing them as code rather than regular text.

### Insecure Deserialization
- Don’t trust user input”
- Serialization is the process of turning an object within a program into formatted data.
- Deserialization is the process of turning formatted data into an object within code.
- Insecure Deserialization is when this process can be exploited to cause unintended behavior.
- If an attacker is able to modify the data that is going to be deserialized, they can change the resulting object, modifying data or adding malicious behaviors.
- the easiest and most reliable way is to just not deserialize external data.

### Using Components with Known Vulnerabilities
- Using Components with Known Vulnerabilities means using software or package versions that are known to be vulnerable.
- The [Common Vulnerabilities and Exposures system](https://cve.mitre.org/) has detailed records of publicly-known vulnerabilities that have been exploited.
- Usually, this can be prevented by keeping software such as operating systems, hosts, database software, etc up to date.

### Insufficient Logging and Monitoring
- Knowing what’s going on within a system is important for detecting, preventing, and responding to attacks.
- Insufficient Logging and Monitoring refers to an overall lack of tools that monitor, record, and report events within a system.
- Having these logs allows monitoring software to scan for suspicious behavior, such as 1000 login attempts in 5 seconds or connections to or from known malicious IP addresses.
