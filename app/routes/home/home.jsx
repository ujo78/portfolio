import sliceAppLarge from '~/assets/slice-app-large.jpg';
import sliceAppPlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceApp from '~/assets/slice-app.jpg';
import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import trafficTwinTextureLarge from '~/assets/traffic-twin-main-large.jpg';
import trafficTwinTexturePlaceholder from '~/assets/traffic-twin-main-placeholder.jpg';
import trafficTwinTexture from '~/assets/traffic-twin-main.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Software Engineer & Builder',
    description: `Portfolio of ${config.name} — full-stack engineer building AI systems, real-time platforms, and infrastructure solutions.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="WorkflowOS — AI Meeting Intelligence"
        description="Swarm of agents transforms meeting transcripts into prioritised backlogs, risk heatmaps, and executable roadmaps on Azure"
        buttonText="View project"
        buttonLink="/projects/workflowos"
        model={{
          type: 'laptop',
          alt: 'WorkflowOS execution dashboard',
          textures: [
            {
              srcSet: `${sliceApp} 1280w, ${sliceAppLarge} 2560w`,
              placeholder: sliceAppPlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Craftboard — Minecraft Hosting Platform"
        description="End-to-end game server hosting with Azure VM lifecycle management, auto-shutdown, and real-time monitoring"
        buttonText="View project"
        buttonLink="/projects/minecraft-panel"
        model={{
          type: 'laptop',
          alt: 'Craftboard server dashboard',
          textures: [
            {
              srcSet: `${gamestackTexture2} 800w, ${gamestackTexture2Large} 1920w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="MentorHub — Mentoring SaaS"
        description="Full-stack mentoring platform with WebRTC video rooms, intelligent session booking, and real-time lifecycle management"
        buttonText="View project"
        buttonLink="/projects/mentorhub"
        model={{
          type: 'laptop',
          alt: 'MentorHub dashboard',
          textures: [
            {
              srcSet: `${sprTexture} 800w, ${sprTextureLarge} 1920w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="AI Memory Vault — Universal Agent Memory"
        description="Unified Obsidian-based memory architecture that synchronises rules and context across every AI coding agent on the machine"
        buttonText="View project"
        buttonLink="/projects/ai-memory"
        model={{
          type: 'laptop',
          alt: 'AI Memory knowledge graph',
          textures: [
            {
              srcSet: `${trafficTwinTexture} 800w, ${trafficTwinTextureLarge} 1920w`,
              placeholder: trafficTwinTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
