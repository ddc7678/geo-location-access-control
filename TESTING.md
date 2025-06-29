# Test Results Document for Node.js IP Geo Location Access Control

## Unit Test
This container was deplyed as an AWS ECS, Once the container was running with the IP Address: 44.202.125.194 an AWS Route 53 DNS entry was created for geoaccesscontrol.darrell.net pointing to the IP Address. As part of the AWS ECS a network access rulewas created to allow TCP port 3000. Then an iniital test was done from a web browser to the URL http://geoaccesscontrol.darrell.net/protected and the exprected resulets of message: "Welcome, US user!" were returned.

Next was to setup a test from difrent countries. This was accomplished with a website tool: https://globalping.io/
The tool was setup to do an http request on port 3000 from 25 global test points. Here are the resulets. 

https://globalping.io?measurement=HRUXg9SFgV6cUS2X
 

## Snyk Code Scan Results

Testing /home/bitnami/GeolocationAccessControl...

Organization:      ddc7678
Package manager:   npm
Target file:       package-lock.json
Project name:      geolocationaccesscontrol
Open source:       no
Project path:      /home/bitnami/GeolocationAccessControl
Licenses:          enabled

✔ Tested 109 dependencies for known issues, no vulnerable paths found.

## Snyk JSON 

{
  "vulnerabilities": [],
  "ok": true,
  "dependencyCount": 109,
  "org": "ddc7678",
  "policy": "# Snyk (https://snyk.io) policy file, patches or ignores known vulnerabilities.\nversion: v1.25.1\nignore: {}\npatch: {}\n",
  "isPrivate": true,
  "licensesPolicy": {
    "severities": {},
    "orgLicenseRules": {
      "AGPL-1.0": {
        "licenseType": "AGPL-1.0",
        "severity": "high",
        "instructions": ""
      },
      "AGPL-3.0": {
        "licenseType": "AGPL-3.0",
        "severity": "high",
        "instructions": ""
      },
      "Artistic-1.0": {
        "licenseType": "Artistic-1.0",
        "severity": "medium",
        "instructions": ""
      },
      "Artistic-2.0": {
        "licenseType": "Artistic-2.0",
        "severity": "medium",
        "instructions": ""
      },
      "CDDL-1.0": {
        "licenseType": "CDDL-1.0",
        "severity": "medium",
        "instructions": ""
      },
      "CPOL-1.02": {
        "licenseType": "CPOL-1.02",
        "severity": "high",
        "instructions": ""
      },
      "EPL-1.0": {
        "licenseType": "EPL-1.0",
        "severity": "medium",
        "instructions": ""
      },
      "GPL-2.0": {
        "licenseType": "GPL-2.0",
        "severity": "high",
        "instructions": ""
      },
      "GPL-3.0": {
        "licenseType": "GPL-3.0",
        "severity": "high",
        "instructions": ""
      },
      "LGPL-2.0": {
        "licenseType": "LGPL-2.0",
        "severity": "medium",
        "instructions": ""
      },
      "LGPL-2.1": {
        "licenseType": "LGPL-2.1",
        "severity": "medium",
        "instructions": ""
      },
      "LGPL-3.0": {
        "licenseType": "LGPL-3.0",
        "severity": "medium",
        "instructions": ""
      },
      "MPL-1.1": {
        "licenseType": "MPL-1.1",
        "severity": "medium",
        "instructions": ""
      },
      "MPL-2.0": {
        "licenseType": "MPL-2.0",
        "severity": "medium",
        "instructions": ""
      },
      "MS-RL": {
        "licenseType": "MS-RL",
        "severity": "medium",
        "instructions": ""
      },
      "SimPL-2.0": {
        "licenseType": "SimPL-2.0",
        "severity": "high",
        "instructions": ""
      }
    }
  },
  "packageManager": "npm",
  "ignoreSettings": {
    "adminOnly": false,
    "reasonRequired": false,
    "disregardFilesystemIgnores": false
  },
  "summary": "No known vulnerabilities",
  "filesystemPolicy": false,
  "uniqueCount": 0,
  "projectName": "geolocationaccesscontrol",
  "displayTargetFile": "package-lock.json",
  "hasUnknownVersions": false,
  "path": "/home/bitnami/GeolocationAccessControl"
}



