import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
} from '~/layouts/project';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import { List, ListItem } from '~/components/list';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';

const title = 'Experience';
const description = 'Professional experience and roles.';

export const meta = () =>
  baseMeta({
    title,
    description,
  });

export const Experience = () => (
  <>
    <ProjectContainer>
      <ProjectHeader
        title={title}
        description={description}
      />
      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Work Experience</ProjectSectionHeading>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>TODO: Company/Role 1</strong>
                </TableCell>
                <TableCell>TODO: Dates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  TODO: Key responsibilities and impact
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>TODO: Company/Role 2</strong>
                </TableCell>
                <TableCell>TODO: Dates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  TODO: Key responsibilities and impact
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>TODO: Company/Role 3</strong>
                </TableCell>
                <TableCell>TODO: Dates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  TODO: Key responsibilities and impact
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Skills & Technologies</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Languages:</strong> Python, Java, JavaScript/TypeScript, Go, Rust
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Web & Full-Stack:</strong> React, Next.js, Node.js, Express, Remix, HTML5,
            CSS3, Tailwind CSS
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Backend & Infrastructure:</strong> FastAPI, Docker, Kubernetes, Azure, AWS,
            GitHub Actions, CI/CD
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Databases:</strong> MongoDB, PostgreSQL, Firestore, Redis
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Real-time & Messaging:</strong> WebRTC, Socket.IO, Firebase, MQTT
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>AI & ML:</strong> LLMs, Agent Systems, Prompt Engineering, RAG, Fine-tuning
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>3D Graphics:</strong> Three.js, Panda3D, WebGL, GLSL shaders
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Education</ProjectSectionHeading>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>TODO: Degree</strong>
                </TableCell>
                <TableCell>TODO: University</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TODO: Graduation date and relevant details</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Languages</ProjectSectionHeading>
          <List>
            <ListItem>English — Fluent</ListItem>
            <ListItem>Hindi — Native</ListItem>
            {/* TODO: Add other languages if applicable */}
          </List>
        </ProjectSectionContent>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </>
);
