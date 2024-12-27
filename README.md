# Building Resource Expression for Occupants (BREO)
This is a quickly spun up web server / application which was used for an internal proof-of-concept for Arup. 

Buildings consume a significant portion of the world's energy and resources, and yet its occupants often remain detached from the consequences of their energy consumption. BREO is a novel approach to tackling this problem, using sensory technology to create a more intuitive and interactive relationship between buildings and their inhabitants. The project leverages human intelligence by creating a responsive system that communicates real-time resource usage. The system equips buildings with API data from building electrical, thermal comfort, air quality, water, natural gas, lighting, and audiovisual systems through sensory outputs. Bridging the gap between building systems and their occupants, BREO assures that people are not only aware of their environmental impact but are also empowered to make changes. The system leverages human senses to communicate resource benchmarking, ensuring occupants can readily discern whether the building is in a positive, neutral, or negative state about its resource usage.

For the developed proof of concept, data specific to Arup's Los Angeles office was taken via this web app and transmitted to Isadora which would then take a subset of the data to visualize the building's "health" to office occupants through audiovisual elements. By doing this, the goal was to encourage occupants to take more thoughtful actions to reduce energy or resource usage based on live conditions. This could mean lowering blinds to increase shade during peak energy demand hours to minimize energy use. The image below shows one example of how this was demonstrated:

![image](https://github.com/user-attachments/assets/ce70385f-0b93-4946-b021-723e9d5c80de)

The data used in this proof-of-concept included the following:
1. Kaiterra Indoor Air Quality Sensors
2. WattTime Energy Grid Cleanliness Index
3. AirNow Outdoor Air Quality Data

A full article on this work was published in [ArchDaily](https://www.archdaily.com/1008979/creating-energy-efficient-buildings-the-role-of-human-interaction-and-sensory-technology).

#Setup
This section provides a basic guide to setting up this project, however, it should be noted that this has not been tested outside of a specific office environment and therefore unpredictable issues may arise.

##Pre-requisites
To run this application, you will need to register an account and recieve an API key from the above data sources listed in the previous section. These should then be added to a .env file created from example.env. The data is also taken within constraints of Los Angeles, and therefore some geographic parameters may need to be updated if your location is outside of this boundary. This project was developed using Node v16 and packages have not been tested within more recent versions.

##Installation and Running
This process should be similar to running many other web applications. From your preferred CLI, change directories to this repo, run an `npm i`, and then from the top level of the repo run `node index.js`.
