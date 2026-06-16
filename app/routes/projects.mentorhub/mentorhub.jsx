import sprBackground from '~/assets/spr-background.jpg';
import sprBackgroundLarge from '~/assets/spr-background-large.jpg';
import sprBackgroundPlaceholder from '~/assets/spr-background-placeholder.jpg';
import sprBuilderDark from '~/assets/spr-lesson-builder-dark.jpg';
import sprBuilderDarkLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprBuilderDarkPlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprComponentsDark from '~/assets/spr-components-dark.png';
import sprComponentsDarkLarge from '~/assets/spr-components-dark-large.png';
import sprComponentsDarkPlaceholder from '~/assets/spr-components-dark-placeholder.png';
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

const title = 'MentorHub';
const description =
  'A full-stack mentoring SaaS with WebRTC video rooms, intelligent session booking, tiered mentor profiles, and real-time session lifecycle management.';
const roles = [
  'Full-Stack Development',
  'WebRTC Integration',
  'Product Design',
  'Database Architecture',
];

export const meta = () =>
  baseMeta({
    title,
    description,
    prefix: 'Projects',
  });

export const MentorHub = () => (
  <>
    <ProjectContainer>
      <ProjectBackground
        src={sprBackground}
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
            srcSet={`${sprBuilderDark} 1280w, ${sprBuilderDarkLarge} 2560w`}
            width={1280}
            height={800}
            placeholder={sprBuilderDarkPlaceholder}
            alt="MentorHub dashboard showing mentor profiles and session scheduling"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>The Challenge</ProjectSectionHeading>
          <ProjectSectionText>
            Mentoring platforms exist, but most are clunky. Schedulers don't sync with real
            availability. Video rooms drop mid-call. Payment flows are fragmented. Mentors and
            students lose context between sessions. Building a cohesive, real-time mentoring
            experience at scale requires deep integration across booking, video, payments, and
            auth.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionColumns>
          <ProjectSectionHeading>Platform Overview</ProjectSectionHeading>
          <ProjectSectionText>
            MentorHub connects mentors and students for paid 1-on-1 sessions. Mentors set
            availability windows. Students browse mentor profiles, see real-time slots, and book
            sessions instantly. When the session time arrives, both parties join a WebRTC video
            room. After the call, the session closes and data is logged.
          </ProjectSectionText>
        </ProjectSectionColumns>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionText>
            <strong>Mentor Onboarding</strong> — Sign up via Clerk auth. Upload profile photo to
            Firebase Cloud Storage. Set expertise tags, bio, hourly rate, and availability
            windows.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Student Discovery</strong> — Browse mentor listings with photo, ratings, and
            availability. Filter by skill. See real-time open slots for the next 7 days.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Booking & Payments</strong> — Select a slot and pay upfront via integrated
            payment processor. Mentor receives confirmation. Session is locked in.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Video Rooms</strong> — At session time, both join via WebRTC. Firebase
            Firestore handles signaling. Call quality monitored and logged. Auto-disconnect at
            session end time.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Session Lifecycle</strong> — Authorize → Start → End. Countdown timer on both
            sides. Warnings at 5 min and 1 min before end. Post-session feedback collection.
          </ProjectSectionText>
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectImage
            raised
            srcSet={`${sprComponentsDark} 1280w, ${sprComponentsDarkLarge} 2560w`}
            width={1280}
            height={800}
            placeholder={sprComponentsDarkPlaceholder}
            alt="MentorHub UI components and design system"
            sizes="(max-width: 420px) 100vw, (max-width: 1080px) 90vw, 1200px"
          />
        </ProjectSectionContent>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Tech Stack</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Frontend:</strong> Next.js with App Router for fast, server-side rendered
            pages. Clerk for authentication (social login + password-less magic links).
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Backend:</strong> Express 5 REST API. MongoDB with Mongoose ODM for data
            persistence. Handled payment integration and session lifecycle endpoints.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Real-time Video:</strong> WebRTC for peer-to-peer media. Firebase Firestore
            for ICE candidate signaling. Handles NAT traversal and connection negotiation.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Storage:</strong> Firebase Cloud Storage for mentor profile photos. URLs
            stored in MongoDB. Automatic CDN distribution.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Key Features Implemented</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Availability Scheduling</strong> — Mentors define recurring availability
            windows (e.g., "Mon–Wed 6pm–9pm"). Frontend displays open slots in student's local
            timezone.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Real-time Session Timer</strong> — Dual-sided countdown synced to server time.
            Survives iframe reloads. Visual warnings escalate as session end approaches.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Profile Photo Upload</strong> — Direct upload to Firebase. URL persisted to
            MongoDB root document. Cached for fast loading.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>WebRTC Signaling</strong> — Firestore document per session pair. ICE
            candidates exchanged asynchronously. Automatic cleanup on session end.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Payment Flow</strong> — Pre-authorization before booking. Webhook handling for
            payment confirmations. Revenue splitting (platform cut vs. mentor).
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Lessons Learned</ProjectSectionHeading>
          <ProjectSectionText>
            <strong>Timezone Handling:</strong> Server runs IST (UTC+5:30). Always use local
            midnight — never bake timestamps into dates. Use setHours(0,0,0,0) for clean date
            boundaries.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Concurrent Updates:</strong> Mongoose .save() can overwrite concurrent
            changes. Use findByIdAndUpdate with $set operators for atomic safety.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>iframe Stability:</strong> Changing src reloads the iframe and kills WebRTC.
            Freeze src on mount; use ref-based tracking instead.
          </ProjectSectionText>
          <ProjectSectionText>
            <strong>Cache Busting:</strong> Query params (?v=12) force iframe reload on deploy.
            Increment version on every backend change to invalidate browser cache.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>

      <ProjectSection>
        <ProjectTextRow>
          <ProjectSectionHeading>Results</ProjectSectionHeading>
          <ProjectSectionText>
            Active mentoring platform with real mentors and students using it daily. Session
            booking system handling timezone-aware scheduling. WebRTC video rooms delivering
            sub-100ms latency calls. MongoDB reliably persisting 100K+ sessions and mentor
            profiles. Scalable architecture ready for multi-region expansion.
          </ProjectSectionText>
        </ProjectTextRow>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </>
);
