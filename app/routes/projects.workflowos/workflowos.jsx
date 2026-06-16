import sliceBackground from '~/assets/slice-background.jpg';
import sliceBackgroundLarge from '~/assets/slice-background-large.jpg';
import sliceBackgroundPlaceholder from '~/assets/slice-background-placeholder.jpg';
import sliceApp from '~/assets/slice-app.jpg';
import sliceAppLarge from '~/assets/slice-app-large.jpg';
import sliceAppPlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceAnnotation from '~/assets/slice-annotation.png';
import sliceAnnotationLarge from '~/assets/slice-sidebar-annotations-large.png';
import sliceAnnotationPlaceholder from '~/assets/slice-sidebar-annotations-placeholder.png';
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
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';

const title = 'WorkflowOS';
const description =
  'An AI agent swarm that transforms meeting transcripts into prioritised backlogs, risk heatmaps, and executable roadmaps — deployed end-to-end on Azure.';
const roles = [
  'AI Systems Architecture',
  'Multi-Agent Orchestration',
  'Cloud Infrastructure',
  'Full-Stack Development',
];

export const meta = () =>
  baseMeta({
    title,
    description,
    prefix: 'Projects',
  });

export const WorkflowOS = () => (
  <>
    <ProjectContainer>
      <ProjectBackground
        src={sliceBackground}
        opacity={0.8}
      />
      <ProjectHeader
        title={title}
        description={description}
        url="https://workflowos-seven.vercel.app"
        roles={roles}
      />
      <ProjectSection padding="top">
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={`${sliceApp} 1280w, ${sliceAppLarge} 2560w`}
            width={1280}
            height={800}
            placeholder={sliceAppPlaceholder}
            alt="WorkflowOS execution dashboard showing swarm agent logs"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>The Problem</ProjectSectionHeading>
          <ProjectSectionText>
            Meeting notes are unstructured. Critical decisions get lost in the audio. Actionable
            items are scattered across transcripts and chat logs. Teams waste time extracting
            insights from hours of recordings when they should be shipping.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionColumns>
          <ProjectSectionHeading>Agent Swarm Architecture</ProjectSectionHeading>
          <ProjectSectionText>
            WorkflowOS deploys a fleet of specialized agents that work in parallel:
          </ProjectSectionText>
        </ProjectSectionColumns>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionText>
            <strong>Data Analyst Agent</strong> — Extracts structured data: attendees, decisions,
            action items, blockers. Cleans noisy transcripts.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Strategist Agent</strong> — Identifies opportunities, dependencies, and
            roadmap implications from decisions. Market-aware planning.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Security Audit Agent</strong> — Flags compliance risks, credential leaks,
            governance issues. Cross-project constraint checking.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Copywriter Agent</strong> — Crafts polished, actionable narratives from raw
            data. Executive-ready summaries.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Reporter Agent</strong> — Synthesises all findings and generates the final
            execution plan with priority ranking and timeline.
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Technical Stack</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Backend:</strong> Python FastAPI running on Azure Web Apps with Azure OpenAI
            LLM inference (GPT-4). Parallel asyncio orchestration with task queuing.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Frontend:</strong> Next.js 14 deployed on Vercel. Real-time execution dashboard
            using Server-Sent Events (SSE) for live agent logs.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Infrastructure:</strong> GitHub Actions CI/CD pipelines. Container-ready
            deployment. Cross-meeting memory for context retention and dependency tracking.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={`${sliceAnnotation} 1280w, ${sliceAnnotationLarge} 2560w`}
            width={1280}
            height={800}
            placeholder={sliceAnnotationPlaceholder}
            alt="Dependency graph and risk heatmap visualization"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>The Execution Dashboard</ProjectSectionHeading>
          <ProjectSectionText>
            Paste a meeting transcript (Zoom, Teams, manual notes). The swarm dissects it in
            parallel. Within seconds, view:
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionText>
            <strong>Executive Summary</strong> — Top-line decisions, outcomes, and key risks
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Dependency Graph</strong> — Visual map of task dependencies and blockers
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Risk Heatmap</strong> — Colour-coded risk assessment per assignee and domain
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Operational Timeline</strong> — Prioritised task list with deadlines and
            ownership
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Results & Impact</ProjectSectionHeading>
          <ProjectSectionText>
            Deployed and live at workflowos-seven.vercel.app. Handles real meeting loads with
            sub-second transcript ingestion. Cross-meeting memory prevents duplicate work and
            surfaces emerging patterns. Teams see structured, actionable output instead of raw
            meeting notes.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </>
);
