// courseData.js
const enhancedCourses = [
    {
      id: 1,
      title: "Introduction to Cybersecurity",
      description: "Learn the fundamentals of cybersecurity and basic threat protection.",
      duration: "4 weeks",
      level: "Beginner",
      prerequisites: [],
      modules: [
        {
          id: 1,
          title: "Basics of Information Security",
          content: `
            <h2>What is Information Security?</h2>
            <p>Information Security (InfoSec) is the practice of protecting information by mitigating information risks. It typically involves preventing or reducing the probability of unauthorized access, use, disclosure, disruption, modification, or destruction of information.</p>
            
            <h3>Key Principles of Information Security:</h3>
            <ul>
              <li><strong>Confidentiality:</strong> Ensuring that information is accessible only to those authorized to have access.</li>
              <li><strong>Integrity:</strong> Maintaining and assuring the accuracy and completeness of data over its entire lifecycle.</li>
              <li><strong>Availability:</strong> Ensuring that information is accessible to authorized users when needed.</li>
            </ul>
  
            <h3>Common Threats:</h3>
            <ul>
              <li>Malware</li>
              <li>Phishing</li>
              <li>Man-in-the-Middle Attacks</li>
              <li>Denial of Service (DoS) Attacks</li>
            </ul>
  
            <h3>Basic Security Measures:</h3>
            <ol>
              <li>Use strong, unique passwords for all accounts</li>
              <li>Keep software and systems up to date</li>
              <li>Use anti-virus and anti-malware software</li>
              <li>Be cautious when clicking on links or downloading attachments</li>
              <li>Use a firewall to monitor and control network traffic</li>
            </ol>
          `,
          quiz: [
            {
              question: "What are the three key principles of Information Security?",
              options: [
                "Confidentiality, Integrity, Availability",
                "Security, Privacy, Control",
                "Prevention, Detection, Response",
                "Authentication, Authorization, Accounting"
              ],
              correctAnswer: 0
            },
            {
              question: "Which of the following is NOT a common cybersecurity threat?",
              options: [
                "Malware",
                "Phishing",
                "Firewall",
                "Denial of Service (DoS) Attack"
              ],
              correctAnswer: 2
            },
            {
              question: "What is the primary purpose of a firewall?",
              options: [
                "To detect and remove viruses",
                "To monitor and control network traffic",
                "To encrypt data transmissions",
                "To create strong passwords"
              ],
              correctAnswer: 1
            }
          ],
          practicalExercise: {
            title: "Identifying Phishing Emails",
            description: "Review the following email and identify potential signs that it might be a phishing attempt.",
            content: `
              From: securityteam@g00glemail.com
              Subject: Urgent: Your account has been compromised
  
              Dear User,
  
              We have detected unusual activity on your account. To secure your account, please click the link below and enter your login credentials:
  
              https://g00gle-security.com/verify
  
              Failure to do so within 24 hours will result in account suspension.
  
              Best regards,
              Google Security Team
            `,
            task: "List at least three signs that suggest this email might be a phishing attempt.",
            hints: [
              "Check the sender's email address carefully",
              "Look for urgent language or threats",
              "Examine the URL of any links provided"
            ]
          }
        },
        {
          id: 2,
          title: "Network Security Fundamentals",
          content: `
            <h2>Understanding Network Security</h2>
            <p>Network security consists of the policies, processes, and practices adopted to prevent, detect, and monitor unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.</p>
  
            <h3>Key Components of Network Security:</h3>
            <ul>
              <li><strong>Firewalls:</strong> Monitors and controls incoming and outgoing network traffic.</li>
              <li><strong>Intrusion Detection Systems (IDS):</strong> Identifies potential security breaches.</li>
              <li><strong>Virtual Private Networks (VPN):</strong> Provides secure, encrypted connections.</li>
              <li><strong>Network Segmentation:</strong> Divides a network into sub-networks to improve security and performance.</li>
            </ul>
  
            <h3>Common Network Attacks:</h3>
            <ul>
              <li>Distributed Denial of Service (DDoS)</li>
              <li>Man-in-the-Middle (MitM)</li>
              <li>SQL Injection</li>
              <li>Password Attacks</li>
            </ul>
  
            <h3>Best Practices for Network Security:</h3>
            <ol>
              <li>Regularly update and patch all systems and software</li>
              <li>Implement strong authentication methods (e.g., 2FA)</li>
              <li>Encrypt sensitive data in transit and at rest</li>
              <li>Conduct regular security audits and penetration testing</li>
              <li>Educate users about security best practices</li>
            </ol>
          `,
          quiz: [
            {
              question: "What is the primary function of a firewall in network security?",
              options: [
                "To encrypt all network traffic",
                "To monitor and control incoming and outgoing network traffic",
                "To detect and remove viruses from the network",
                "To segment the network into smaller sub-networks"
              ],
              correctAnswer: 1
            },
            {
              question: "Which of the following is NOT a common network attack?",
              options: [
                "Distributed Denial of Service (DDoS)",
                "Man-in-the-Middle (MitM)",
                "SQL Injection",
                "Phishing"
              ],
              correctAnswer: 3
            },
            {
              question: "What does VPN stand for in the context of network security?",
              options: [
                "Very Private Network",
                "Virtual Protocol Network",
                "Virtual Private Network",
                "Verified Public Network"
              ],
              correctAnswer: 2
            }
          ],
          practicalExercise: {
            title: "Configuring a Basic Firewall",
            description: "In this exercise, you'll configure a basic firewall using iptables on a Linux system.",
            content: `
              Scenario: You're setting up a web server that should only allow incoming traffic on ports 80 (HTTP) and 443 (HTTPS), as well as port 22 (SSH) for remote administration.
  
              Use the following iptables commands to configure the firewall:
  
              1. Allow incoming traffic on port 80 (HTTP):
                 sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
  
              2. Allow incoming traffic on port 443 (HTTPS):
                 sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
  
              3. Allow incoming traffic on port 22 (SSH):
                 sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
  
              4. Set the default policy to drop all incoming traffic:
                 sudo iptables -P INPUT DROP
  
              5. Allow all outgoing traffic:
                 sudo iptables -P OUTPUT ACCEPT
  
              6. Allow established connections:
                 sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
            `,
            task: "Explain the purpose of each iptables command and how they work together to secure the server.",
            hints: [
              "Consider the order of the rules and how it affects traffic processing",
              "Think about why allowing established connections is important",
              "Reflect on the security implications of the default policies"
            ]
          }
        }
      ]
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      description: "Learn the basics of web development, including HTML, CSS, and JavaScript.",
      duration: "6 weeks",
      level: "Beginner",
      prerequisites: [],
      modules: [
        {
          id: 1,
          title: "HTML and CSS Basics",
          content: `
            <h2>Introduction to HTML</h2>
            <p>HTML (Hypertext Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
  
            <h3>Basic HTML Structure:</h3>
            <pre><code>
            &lt;!DOCTYPE html&gt;
            &lt;html lang="en"&gt;
            &lt;head&gt;
                &lt;meta charset="UTF-8"&gt;
                &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
                &lt;title&gt;Document Title&lt;/title&gt;
            &lt;/head&gt;
            &lt;body&gt;
                &lt;h1&gt;This is a heading&lt;/h1&gt;
                &lt;p&gt;This is a paragraph.&lt;/p&gt;
            &lt;/body&gt;
            &lt;/html&gt;
            </code></pre>
  
            <h2>Introduction to CSS</h2>
            <p>CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.</p>
  
            <h3>Basic CSS Syntax:</h3>
            <pre><code>
            selector {
              property: value;
              another-property: value;
            }
            </code></pre>
  
            <h3>Example CSS:</h3>
            <pre><code>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
  
            h1 {
              color: #0066cc;
            }
  
            .highlight {
              background-color: yellow;
            }
            </code></pre>
          `,
          quiz: [
            {
              question: "What does HTML stand for?",
              options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language"
              ],
              correctAnswer: 0
            },
            {
              question: "Which tag is used to define an unordered list in HTML?",
              options: [
                "<ol>",
                "<li>",
                "<ul>",
                "<list>"
              ],
              correctAnswer: 2
            },
            {
              question: "In CSS, how would you select an element with the class 'highlight'?",
              options: [
                "#highlight",
                ".highlight",
                "highlight",
                "*highlight"
              ],
              correctAnswer: 1
            }
          ],
          practicalExercise: {
            title: "Creating a Simple Web Page",
            description: "Create a simple web page using HTML and CSS.",
            content: `
              Task: Create a web page that includes the following elements:
              1. A main heading (h1) with the text "My First Web Page"
              2. A paragraph introducing yourself
              3. An unordered list of your top 3 favorite foods
              4. Use CSS to style the page:
                 - Set the font family to Arial or a sans-serif fallback
                 - Make the main heading blue
                 - Add a light gray background to the list items
            `,
            task: "Create the HTML and CSS for the described web page. Provide your code in the answer.",
            hints: [
              "Remember to link your CSS file or use a <style> tag in your HTML",
              "Use class selectors for more specific styling",
              "Don't forget to close all your HTML tags properly"
            ]
          }
        },
        // More modules...
      ]
    },
    // More courses...
  ];
  
  export default enhancedCourses;