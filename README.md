PROJECT OVERVIEW:
* This project demonstrates the deployment of a 3-tier e-commerce application using docker.

The application is structured into three layers (tiers):
* Frontend (Presentation Layer) using Node.js 
* Backend (Application Layer) using Node.js 
* Database (Data Layer) using MySQL.

SERVICES USED:
* Amazon VPC for Network isolation.
* Application Load Balancer for Traffic distribution 
* Auto Scaling Group for Elastic scaling
* Ngnix reverse proxy for routing traffic to Node app
* Amazon RDS for Database layer (Multi-AZ) 
* Amazon S3 for Storage/logs/artifacts 
* AWS IAM – Access control 
* Amazon CloudWatch – Monitoring & logs 
* Amazon Route 53 – Domain routing 
* AWS Certificate Manager – HTTPS certificates

VPC CREATION:
* Create a VPC with CIDR range of 10.0.0.0/16.

SUBNET CREATION:
* Create four subnets across two availability zones. 
* Two subnets is in one availability zone, and other two subnets is in another zone. 
* Each subnet in one availability zone will correspond to one layer of three tier architecture. 
* Public subnet hosts the frontend server and one Private subnet host the backend server and the other Private subnet host the Database

INTERNET GATEWAY:
* In order to give the public subnets in the VPC internet access, Internet Gateway needs to be created and attached to the VPC.
* The created internet gateway is attached it to the VPC.

NAT GATEWAY:
* For the app layer private subnet to be able to access the internet they will need to go through a NAT Gateway. The NAT Gateway is created in public subnet.

ROUTE TABLES:
* Route table is created in the same VPC to route the traffic from the subnet to the internet.
* Two route tables are created:
  * Route table associated with public subnet navigate the traffic from the instance in public subnet to the internet gateway.
  * Route table associated with private subnet navigate the traffic from the instance in the private subnet to the NAT Gateway.

SECURITY GROUPS: 
* Security groups will tighten the rules around which traffic will be allowed to our Elastic Load Balancers and EC2 instances.
* Internet facing load balancer’s Security Group:
  * HTTP 80 port enabled in In-bound rules.
  * HTTPS 443 port enabled in In-bound rules.

Public EC2 Security Group:
* HTTP - Security Group of Internet facing Load Balancer.
* SSH – My IP.

RDS Security Group (sg-db):
* In Inbound rules: 
  * MySQL: Port 3306 enabled. Source: EC2- Security Group.

DATABASE LAYER (RDS):
* Launch Amazon RDS instance: 
* Engine: MySQL/PostgreSQL 
* Multi-AZ: Enabled 
* Security: 
  * Allow inbound traffic only from EC2 Security Group
 
APPLICATION LAYER (EC2 + DOCKER):
* Create a custom AMI:

Steps:
* Launch EC2 instance
* Install: 
  * Docker
  * Node.js App
  * Nginx (Reverse Proxy)
    * Nginx Role:
      * Route traffic to Node app 






