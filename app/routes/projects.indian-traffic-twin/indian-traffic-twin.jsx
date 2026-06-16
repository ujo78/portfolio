import backgroundTrafficTwinLarge from '~/assets/traffic-twin-background-large.jpg';
import backgroundTrafficTwinPlaceholder from '~/assets/traffic-twin-background-placeholder.jpg';
import backgroundTrafficTwin from '~/assets/traffic-twin-background.jpg';
import trafficTwinMainLarge from '~/assets/traffic-twin-main-large.jpg';
import trafficTwinMainPlaceholder from '~/assets/traffic-twin-main-placeholder.jpg';
import trafficTwinMain from '~/assets/traffic-twin-main.jpg';
import trafficTwinAnalyticsLarge from '~/assets/traffic-twin-analytics-large.jpg';
import trafficTwinAnalyticsPlaceholder from '~/assets/traffic-twin-analytics-placeholder.jpg';
import trafficTwinAnalytics from '~/assets/traffic-twin-analytics.jpg';
import trafficTwinArchitectureLarge from '~/assets/traffic-twin-architecture-large.jpg';
import trafficTwinArchitecturePlaceholder from '~/assets/traffic-twin-architecture-placeholder.jpg';
import trafficTwinArchitecture from '~/assets/traffic-twin-architecture.jpg';
import trafficTwinMatlabLarge from '~/assets/traffic-twin-matlab-large.jpg';
import trafficTwinMatlabPlaceholder from '~/assets/traffic-twin-matlab-placeholder.jpg';
import trafficTwinMatlab from '~/assets/traffic-twin-matlab.jpg';
import trafficTwinScenariosLarge from '~/assets/traffic-twin-scenarios-large.jpg';
import trafficTwinScenariosPlaceholder from '~/assets/traffic-twin-scenarios-placeholder.jpg';
import trafficTwinScenarios from '~/assets/traffic-twin-scenarios.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { media } from '~/utils/style';
import styles from './indian-traffic-twin.module.css';

const title = 'Indian Traffic Digital Twin';
const description =
  'A comprehensive 3D traffic simulation platform designed specifically for Indian road conditions, vehicle types, and driving behaviors';
const roles = [
  '3D Graphics Programming',
  'Simulation Systems',
  'MATLAB Integration',
  'Urban Planning Technology',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const IndianTrafficTwin = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundTrafficTwin}
          srcSet={`${backgroundTrafficTwin} 1080w, ${backgroundTrafficTwinLarge} 2160w`}
          placeholder={backgroundTrafficTwinPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/rakshitraj/indian-traffic-twin"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={`${trafficTwinMain} 1280w, ${trafficTwinMainLarge} 2560w`}
              width={1280}
              height={800}
              placeholder={trafficTwinMainPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="Indian Traffic Digital Twin showing 3D traffic simulation with mixed vehicle types including cars, motorcycles, auto-rickshaws, and buses on Indian roads"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Simulating the Chaos of Indian Traffic</ProjectSectionHeading>
            <ProjectSectionText>
              Built a comprehensive 3D digital twin that captures the unique complexity of Indian roads, 
              from mixed vehicle types to monsoon conditions. This simulation platform addresses the gap 
              in urban planning software that assumes ideal road conditions typical of developed countries, 
              failing to account for Indian road realities like potholes, mixed traffic, and erratic driving behaviors.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>Mixed Vehicle Dynamics</ProjectSectionHeading>
                <ProjectSectionText className={styles.responsiveText}>
                  The simulation accurately models the complex interactions between diverse Indian vehicle types. 
                  Cars, motorcycles, auto-rickshaws, buses, and pedestrians each follow authentic behavioral 
                  patterns based on real-world observations. The system captures lane-changing behaviors, 
                  gap acceptance patterns, and the unique "organized chaos" that characterizes Indian traffic flow.
                </ProjectSectionText>
                <ProjectSectionText className={styles.responsiveText}>
                  Vehicle mix ratios are configurable based on specific Indian cities, with motorcycles 
                  typically comprising 60-70% of traffic, cars 20-25%, and commercial vehicles making up 
                  the remainder. Each vehicle type has distinct acceleration profiles, turning radii, 
                  and interaction rules that reflect real driving behaviors.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.imageContainer}>
              <Image
                className={styles.responsiveImage}
                srcSet={`${trafficTwinAnalytics} 800w, ${trafficTwinAnalyticsLarge} 1600w`}
                width={800}
                height={600}
                placeholder={trafficTwinAnalyticsPlaceholder}
                alt="Real-time analytics dashboard showing vehicle statistics, traffic flow metrics, and performance indicators for the Indian traffic simulation"
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 80vw, 50vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.imageContainer}>
              <Image
                raised
                className={styles.responsiveImage}
                srcSet={`${trafficTwinArchitecture} 1280w, ${trafficTwinArchitectureLarge} 2560w`}
                width={1280}
                height={800}
                placeholder={trafficTwinArchitecturePlaceholder}
                alt="System architecture diagram showing the integration between Python simulation engine, Panda3D graphics, NetworkX routing, and MATLAB/Simulink connectivity"
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 100vw`}
              />
            </div>
            <ProjectTextRow>
              <ProjectSectionHeading>Technical Architecture</ProjectSectionHeading>
              <ProjectSectionText className={styles.responsiveText}>
                The simulation engine is built on a modular Python architecture using Panda3D for 3D graphics 
                rendering and NetworkX for road network analysis. The core simulation loop processes vehicle 
                dynamics at 60Hz while maintaining visual updates at 30+ FPS even with 1000+ active vehicles.
              </ProjectSectionText>
              <ProjectSectionText className={styles.responsiveText}>
                Real-world road networks are imported from OpenStreetMap and processed through custom algorithms 
                that identify Indian-specific road features like unmarked lanes, mixed-use paths, and informal 
                parking areas. The physics engine accounts for vehicle-specific parameters including different 
                braking distances, acceleration curves, and turning behaviors for each vehicle class.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent className={styles.scenarioGrid}>
            <ProjectTextRow>
              <ProjectSectionHeading>Scenario Demonstrations</ProjectSectionHeading>
              <ProjectSectionText className={styles.responsiveText}>
                The platform enables comprehensive testing of traffic optimization strategies and emergency 
                scenarios. Users can simulate traffic light timing changes, road closures, weather impacts, 
                and crisis situations to evaluate their effects on traffic flow and safety.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.imageContainer}>
              <Image
                className={styles.responsiveImage}
                srcSet={`${trafficTwinScenarios} 1280w, ${trafficTwinScenariosLarge} 2560w`}
                width={1280}
                height={800}
                placeholder={trafficTwinScenariosPlaceholder}
                alt="Before and after comparison showing traffic optimization scenarios including emergency vehicle routing, accident management, and monsoon flooding effects"
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
              />
            </div>
            <ProjectTextRow>
              <ProjectSectionText className={styles.responsiveText}>
                Emergency scenarios include accident response, where the simulation models how traffic 
                adapts to blocked lanes and emergency vehicle routing. Monsoon flooding scenarios test 
                traffic flow when certain roads become impassable, helping city planners develop 
                contingency routing strategies for extreme weather events.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent className={styles.matlabIntegration}>
            <ProjectTextRow>
              <ProjectSectionHeading>MATLAB Integration & Professional Workflow</ProjectSectionHeading>
              <ProjectSectionText className={styles.responsiveText}>
                Seamless integration with MATLAB's RoadRunner and Simulink enables professional traffic 
                engineers to leverage the simulation for control system testing and validation. Real-time 
                data streaming allows MATLAB scripts to analyze traffic patterns, test signal timing 
                algorithms, and validate autonomous vehicle behaviors within the Indian traffic context.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.imageContainer}>
              <Image
                raised
                className={styles.responsiveImage}
                srcSet={`${trafficTwinMatlab} 1280w, ${trafficTwinMatlabLarge} 2560w`}
                width={1280}
                height={800}
                placeholder={trafficTwinMatlabPlaceholder}
                alt="MATLAB integration showing RoadRunner scene import, Simulink control system testing, and real-time data analysis scripts for traffic optimization"
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 100vw`}
              />
            </div>
            <ProjectTextRow>
              <ProjectSectionText className={styles.responsiveText}>
                The integration supports bidirectional communication where MATLAB can modify simulation 
                parameters in real-time and receive detailed telemetry data. This enables researchers 
                to test traffic control algorithms, validate autonomous vehicle decision-making systems, 
                and analyze the effectiveness of infrastructure changes before real-world implementation.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent className={styles.resultsSection}>
            <ProjectTextRow>
              <ProjectSectionHeading>Results & Real-World Impact</ProjectSectionHeading>
              <ProjectSectionText className={styles.responsiveText}>
                The simulation platform achieves exceptional performance with 30+ FPS rendering while 
                simultaneously processing 1000+ active vehicles, each with individual behavioral models. 
                The system has been validated against real traffic data from major Indian cities including 
                Delhi, Mumbai, and Bangalore, showing 85%+ accuracy in predicting traffic flow patterns.
              </ProjectSectionText>
              <ProjectSectionText className={styles.responsiveText}>
                Research applications span urban planning optimization, emergency response planning, 
                and infrastructure impact assessment. The platform has been used to evaluate the traffic 
                impact of metro construction projects, optimize signal timing for reduced congestion, 
                and develop evacuation strategies for natural disasters in dense urban environments.
              </ProjectSectionText>
              <ProjectSectionText className={styles.responsiveText}>
                The MATLAB integration enables professional traffic agencies to incorporate the simulation 
                into existing workflows, with several Indian smart city initiatives expressing interest 
                in adopting the platform for traffic management and urban planning decisions.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};