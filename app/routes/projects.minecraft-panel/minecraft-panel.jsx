import gamestackBackground from '~/assets/gamestack-login-large.jpg';
import gamestackList from '~/assets/gamestack-list.jpg';
import gamestackLogin from '~/assets/gamestack-login.jpg';
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

const title = 'Craftboard';
const description =
  'End-to-end game server hosting with Azure VM lifecycle management, automatic shutdown after player inactivity, real-time monitoring, and full mod/plugin management.';
const roles = [
  'Cloud Infrastructure',
  'Real-time Systems',
  'Full-Stack Development',
  'DevOps',
];

export const meta = () =>
  baseMeta({
    title,
    description,
    prefix: 'Projects',
  });

export const MinecraftPanel = () => (
  <>
    <ProjectContainer>
      <ProjectBackground
        src={gamestackBackground}
        opacity={0.8}
      />
      <ProjectHeader
        title={title}
        description={description}
        url="https://mcpanel.rajrakshit.dev"
        roles={roles}
      />
      <ProjectSection padding="top">
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={gamestackList}
            width={1280}
            height={800}
            placeholder={gamestackList}
            alt="Craftboard server dashboard showing server status, players, and metrics"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>The Architecture</ProjectSectionHeading>
          <ProjectSectionText>
            A dual-VM strategy on Azure: a Web VM that's always-on (cheap, stateless) and a Game
            VM that spawns on-demand. When no players are active for 30 minutes, the game VM
            automatically shuts down. Full cost control without sacrificing responsiveness.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionColumns>
          <ProjectSectionHeading>How It Works</ProjectSectionHeading>
          <ProjectSectionText>
            Launch the dashboard and pick a server. The Web VM manages the interface — it's always
            there. Click "Start Server" and the game VM spins up, Minecraft Java process launches,
            and players can connect in seconds.
          </ProjectSectionText>
        </ProjectSectionColumns>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionText>
            <strong>Inactivity Tracking</strong> — Dual-idle system monitors both dashboard
            activity (is anyone managing?) and in-game player count. Once both are idle for 30
            minutes, the VM powers down automatically.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Real-time Communication</strong> — Socket.IO bridges the Web VM and Game VM,
            pushing player list updates, performance metrics, and server logs in real-time.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Azure ARM SDK Integration</strong> — Programmatic VM lifecycle: start, stop,
            deallocate. Minimal compute costs when idle.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Multi-server Support</strong> — 4 pre-configured servers (Cobbleverse, All the
            Mons, ATM10, Cobblemon Academy). Switch between them via status-gated switcher.
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Features</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Mod & Plugin Management</strong> — Search and install mods via Modrinth API.
            Automated dependency resolution.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Player Management</strong> — Whitelist control, session history, ban management
            from the dashboard.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Performance Monitoring</strong> — CPU, RAM, disk metrics with Recharts
            visualization. Spot bottlenecks fast.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>File Browser & Backups</strong> — Upload/download world files, create snapshots,
            restore from backups. One-click disaster recovery.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Server Properties Editor</strong> — Adjust difficulty, mode, max players,
            render distance — all from the UI.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={gamestackLogin}
            width={1280}
            height={800}
            placeholder={gamestackLogin}
            alt="Craftboard login and authentication interface"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Authentication & Security</ProjectSectionHeading>
          <ProjectSectionText>
            Dual auth: Google OAuth for quick login or local username/password for air-gapped
            environments. First user is auto-admin. Password hashing with bcrypt. JWT tokens for
            session management.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Tech Stack</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Backend:</strong> Express 5, Socket.IO 4, Passport.js authentication, Azure
            ARM SDK for VM lifecycle, multer for file uploads, archiver for backups.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Frontend:</strong> React 18, Vite 5, Tailwind CSS 3, Recharts for metrics,
            Lucide icons.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Infrastructure:</strong> Azure VMs (Web and Game), Node.js runtime, Minecraft
            Java edition server on Linux.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Results</ProjectSectionHeading>
          <ProjectSectionText>
            Deployed at mcpanel.rajrakshit.dev. Manages 4 active servers. Auto-shutdown saves
            ~60% on compute costs vs. 24/7 VMs. Real-time dashboards give instant visibility
            into server state and player activity.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </>
);
