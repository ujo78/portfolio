import trafficBackground from '~/assets/traffic-twin-background.jpg';
import trafficMain from '~/assets/traffic-twin-main.jpg';
import trafficArchitecture from '~/assets/traffic-twin-architecture.jpg';
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

const title = 'AI Memory Vault';
const description =
  'A unified Obsidian-based memory architecture that synchronises rules, context, and project knowledge across every AI coding agent on the machine via MCP.';
const roles = [
  'AI Systems Design',
  'Developer Tooling',
  'Knowledge Architecture',
  'Automation',
];

export const meta = () =>
  baseMeta({
    title,
    description,
    prefix: 'Projects',
  });

export const AIMemory = () => (
  <>
    <ProjectContainer>
      <ProjectBackground
        src={trafficBackground}
        opacity={0.8}
      />
      <ProjectHeader
        title={title}
        description={description}
        roles={roles}
      />
      <ProjectSection padding="top">
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={trafficMain}
            width={1280}
            height={800}
            placeholder={trafficMain}
            alt="AI Memory Vault knowledge graph visualization"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>The Problem</ProjectSectionHeading>
          <ProjectSectionText>
            You use 7 different AI coding agents: Claude Code, Cursor, Windsurf, Gemini, GitHub
            Copilot, Kiro, and Antigravity. Each has isolated memory. Rules, project context, and
            hard-won lessons live in separate silos. You repeat explanations across tools. Context
            is lost between sessions. Knowledge doesn't compound.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionColumns>
          <ProjectSectionHeading>The Solution: Unified Memory</ProjectSectionHeading>
          <ProjectSectionText>
            A single Obsidian vault fed by a Node.js sync engine. All agents read from this source
            of truth. Rules propagate outward. Memory flows back inward. Sessions are exported as
            readable markdown. Every agent stays in sync.
          </ProjectSectionText>
        </ProjectSectionColumns>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionText>
            <strong>Rules Flow Outward:</strong> Edit AGENTS.md once in the vault. Run sync-memory.mjs.
            The script propagates rules to Claude Code (~/.claude/CLAUDE.md), Cursor
            (~/.cursor/rules/), Windsurf (~/.windsurf/memories/), Gemini, Copilot, and Kiro
            automatically.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Memory Flows Back Inward:</strong> When an agent writes to its local memory
            directory, directory junctions instantly mirror changes into the vault. No manual sync
            needed.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Sessions Exported:</strong> Chat transcripts (.jsonl) are converted to readable
            markdown and organized by project in sessions/. Searchable, citable, permanent.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Live MCP Access:</strong> All MCP-capable agents (Claude, Cursor, Windsurf,
            Gemini, Antigravity) access the vault live via Obsidian's Local REST API. Real-time
            reads and writes.
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={trafficArchitecture}
            width={1280}
            height={800}
            placeholder={trafficArchitecture}
            alt="AI Memory architecture diagram showing sync flows and agent integrations"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Architecture</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Vault Root:</strong> ~/AI-Memory — the single source of truth. Organized by
            rules (global + language/domain-scoped), memory (cross-project facts), projects
            (per-project context), and sessions (exported transcripts).
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Sync Engine:</strong> sync-memory.mjs runs on demand or in --watch mode. It
            reads rules from the vault and writes to all 7 agent config locations. Supports
            --project and --dry-run flags for safety.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Directory Junctions:</strong> Project memory at ~/.claude/projects/*/memory/
            appears in the vault via Windows directory junctions. Bidirectional sync at the
            filesystem level.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>MCP Server:</strong> Obsidian Local REST API (port 27123 HTTP, 27124 HTTPS).
            Agents authenticate with API key and read/write markdown files live. No file watcher
            needed.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionText>
            <strong>Global Rules (AGENTS.md)</strong> — Edit once, syncs to all agents. Includes
            TypeScript conventions, Azure deployment rules, and universal coding practices.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Scoped Rules (languages/, domains/)</strong> — Language-specific (TypeScript,
            Python) and domain-specific (Azure, Kubernetes) rules. Appended by the sync script.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Project Memory</strong> — User profile, feedback, project context, and
            references. Lives in projects/*/memory/. Junctioned for instant bidirectional sync.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Session Exports</strong> — Chat transcripts converted to markdown with
            INDEX.md dashboard. Organized by project and date. Fully searchable in Obsidian.
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Key Features</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Multi-Agent Sync:</strong> All 7 agents read the same rules. No conflicts, no
            stale data.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Bidirectional Memory Flow:</strong> Agents write local memory → junctions
            mirror to vault. Vault edits → agents see changes instantly.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Session Preservation:</strong> All chat transcripts exported to readable
            markdown. Build a searchable knowledge base over time.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Watch Mode:</strong> Run sync-memory.mjs --watch and changes propagate
            immediately. Development and deployment integrated.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Per-Project Isolation:</strong> Each project has its own memory directory.
            Rules are global; context is local. Best of both worlds.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Implementation Details</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Scripts:</strong> sync-memory.mjs (sync rules), link-claude-project.ps1
            (migrate memory), register-mcp.mjs (wire up Obsidian MCP), export-sessions.mjs
            (convert transcripts).
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Agent Integrations:</strong> Claude Code reads ~/.claude/CLAUDE.md via
            @import. Cursor uses ~/.cursor/rules/. Windsurf reads ~/.windsurf/memories/. Gemini,
            Copilot, Kiro, Antigravity each have dedicated rule files.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Runtime:</strong> Node.js 18+. Uses file system APIs for junctions (Windows)
            and POSIX symlinks (Mac/Linux). No external database needed.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Results</ProjectSectionHeading>
          <ProjectSectionText>
            ✅ Vault live with 9 exported sessions and 3 projects fully migrated. ✅ All agents
            connected via MCP and receiving synced rules. ✅ Rules propagate in seconds. ✅
            Project memory mirrors bidirectionally. ✅ Sessions searchable in Obsidian. ✅ No
            vendor lock-in — everything is markdown and Node.js scripts.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Why This Matters</ProjectSectionHeading>
          <ProjectSectionText>
            AI agents are powerful but stateless. Each starts fresh. By building unified memory
            infrastructure, you keep context alive across tools, sessions, and projects. Rules
            compound. Knowledge grows. Your AI assistants become smarter and more coherent over
            time — because they remember.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </>
);
