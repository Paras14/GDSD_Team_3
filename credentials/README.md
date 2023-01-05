# MySQL Database Credentials:
- Url: db-instance-team3.czsntcnwbbwf.us-east-1.rds.amazonaws.com
- Port: 3306
- Username: admin
- Password: gdsdteam3
- Database name: restaurantsbd

# Backend Instance Credentials:
instance ID:
i-0f29ac7a0b9cf8e77 (restaurant-instance)
1. Open an SSH client.

2. Locate the private key file. The key used to launch this instance is restaurant-key-pair.pem

3. Run this command, if necessary, to ensure that the key is not publicly viewable.
  chmod 400 restaurant-key-pair.pem

4. Connect to the instance using its public DNS:
  ec2-3-87-229-41.compute-1.amazonaws.com

Example:

  ssh -i "restaurant-key-pair.pem" ubuntu@ec2-3-87-229-41.compute-1.amazonaws.com