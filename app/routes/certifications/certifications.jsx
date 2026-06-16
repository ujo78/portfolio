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

const title = 'Certifications';
const description = 'Professional certifications, credentials, and achievements.';

export const meta = () =>
  baseMeta({
    title,
    description,
  });

export const Certifications = () => (
  <>
    <ProjectContainer>
      <ProjectHeader
        title={title}
        description={description}
      />
      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Professional Certifications</ProjectSectionHeading>
          <Table>
            <TableBody>
              <TableRow>
                <TableHeadCell>Certification</TableHeadCell>
                <TableHeadCell>Issuer</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>TODO: Certification Name 1</strong>
                </TableCell>
                <TableCell>TODO: Issuing Organization</TableCell>
                <TableCell>TODO: Date</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Credential ID: TODO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>TODO: Certification Name 2</strong>
                </TableCell>
                <TableCell>TODO: Issuing Organization</TableCell>
                <TableCell>TODO: Date</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Credential ID: TODO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>TODO: Certification Name 3</strong>
                </TableCell>
                <TableCell>TODO: Issuing Organization</TableCell>
                <TableCell>TODO: Date</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Credential ID: TODO</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Awards & Recognition</ProjectSectionHeading>
          <List>
            <ListItem>TODO: Award or recognition 1 — Details and date</ListItem>
            <ListItem>TODO: Award or recognition 2 — Details and date</ListItem>
            <ListItem>TODO: Award or recognition 3 — Details and date</ListItem>
          </List>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Courses & Training</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>TODO: Course Name 1</strong> — Platform, completion date, topics covered
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>TODO: Course Name 2</strong> — Platform, completion date, topics covered
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>TODO: Course Name 3</strong> — Platform, completion date, topics covered
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Open Source & Community</ProjectSectionHeading>
          <ProjectSectionText>
            TODO: Open source contributions, speaking engagements, community involvement, or
            notable project collaborations
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </>
);
