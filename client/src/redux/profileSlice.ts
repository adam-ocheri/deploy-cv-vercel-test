import { SERVER_URI } from '@/hooks/useSSE';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from './store';
import { logout } from './auth/authSlice';

const initialState: Profile = {
  contact: [],
  jobs: [],
  education: [],
  skills: [],
  volunteer: [],
  certifications: [],
  courses: [],
  honorsAwards: [],
  languages: [],
  projects: [],
  publications: [],
  patents: [],
  recommendations: [],
};

const profileAdapter = createAsyncThunk(
  'profile/getUserProfile',
  async (profileId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URI}/api/profile`, {
        headers: {
          'Content-Type': 'application/json',
          profile: profileId,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (profile: Profile, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;
    const profileId = auth.user?.profileId;

    try {
      const response = await axios.put(
        `${SERVER_URI}/api/profile`,
        {
          ...profile,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            profile: profileId,
          },
        }
      );
      console.log(response, 'update user profile from redux');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Profile>) => {
      return action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contact.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contact[index] = action.payload;
      } else {
        state.contact.push(action.payload);
      }
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contact.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) state.contact[index] = action.payload;
    },
    addJob: (state, action: PayloadAction<Jobs>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Jobs>) => {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<Jobs>) => {
      state.jobs.splice(
        state.jobs.findIndex((job) => job.id === action.payload.id),
        1
      );
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.education.findIndex(
        (edu) => edu.id === action.payload.id
      );
      if (index !== -1) state.education[index] = action.payload;
    },
    deleteEducation: (state, action: PayloadAction<Education>) => {
      state.education.splice(
        state.education.findIndex((edu) => edu.id === action.payload.id),
        1
      );
    },
    addSkill: (state, action: PayloadAction<Skills>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<Skills>) => {
      const index = state.skills.findIndex(
        (skill) => skill.id === action.payload.id
      );
      if (index !== -1) state.skills[index] = action.payload;
    },
    deleteSkill: (state, action: PayloadAction<Skills>) => {
      state.skills.splice(
        state.skills.findIndex((skill) => skill.id === action.payload.id),
        1
      );
    },
    addVolunteer: (state, action: PayloadAction<Volunteer>) => {
      state.volunteer.push(action.payload);
    },
    updateVolunteer: (state, action: PayloadAction<Volunteer>) => {
      const index = state.volunteer.findIndex(
        (vol) => vol.id === action.payload.id
      );
      if (index !== -1) state.volunteer[index] = action.payload;
    },
    deleteVolunteer: (state, action: PayloadAction<Volunteer>) => {
      state.volunteer.splice(
        state.volunteer.findIndex((vol) => vol.id === action.payload.id),
        1
      );
    },
    addCertificate: (state, action: PayloadAction<Certification>) => {
      state.certifications.push(action.payload);
    },
    updateCertificate: (state, action: PayloadAction<Certification>) => {
      const index = state.certifications.findIndex(
        (cer) => cer.id === action.payload.id
      );
      if (index !== -1) state.certifications[index] = action.payload;
    },
    deleteCertificate: (state, action: PayloadAction<Certification>) => {
      state.certifications.splice(
        state.certifications.findIndex((cer) => cer.id === action.payload.id),
        1
      );
    },
    addCourse: (state, action: PayloadAction<Courses>) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action: PayloadAction<Courses>) => {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) state.courses[index] = action.payload;
    },
    deleteCourse: (state, action: PayloadAction<Courses>) => {
      state.courses.splice(
        state.courses.findIndex((course) => course.id === action.payload.id),
        1
      );
    },
    addHonor: (state, action: PayloadAction<Honors>) => {
      state.honorsAwards.push(action.payload);
    },
    updateHonor: (state, action: PayloadAction<Honors>) => {
      const index = state.honorsAwards.findIndex(
        (honor) => honor.id === action.payload.id
      );
      if (index !== -1) state.honorsAwards[index] = action.payload;
    },
    deleteHonor: (state, action: PayloadAction<Courses>) => {
      state.honorsAwards.splice(
        state.honorsAwards.findIndex((honor) => honor.id === action.payload.id),
        1
      );
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
      state.languages.push(action.payload);
    },
    updateLanguage: (state, action: PayloadAction<Language>) => {
      const index = state.languages.findIndex(
        (lang) => lang.id === action.payload.id
      );
      if (index !== -1) state.languages[index] = action.payload;
    },
    deleteLanguage: (state, action: PayloadAction<Language>) => {
      state.languages.splice(
        state.languages.findIndex((lang) => lang.id === action.payload.id),
        1
      );
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) state.projects[index] = action.payload;
    },
    deleteProject: (state, action: PayloadAction<Project>) => {
      state.projects.splice(
        state.projects.findIndex((project) => project.id === action.payload.id),
        1
      );
    },
    addPublication: (state, action: PayloadAction<Publication>) => {
      state.publications.push(action.payload);
    },
    updatePublication: (state, action: PayloadAction<Publication>) => {
      const index = state.publications.findIndex(
        (pub) => pub.id === action.payload.id
      );
      if (index !== -1) state.publications[index] = action.payload;
    },
    deletePublication: (state, action: PayloadAction<Publication>) => {
      state.publications.splice(
        state.publications.findIndex((pub) => pub.id === action.payload.id),
        1
      );
    },
    addPatent: (state, action: PayloadAction<Patent>) => {
      state.patents.push(action.payload);
    },
    updatePatent: (state, action: PayloadAction<Patent>) => {
      const index = state.patents.findIndex(
        (patent) => patent.id === action.payload.id
      );
      if (index !== -1) state.patents[index] = action.payload;
    },
    deletePatent: (state, action: PayloadAction<Patent>) => {
      state.patents.splice(
        state.patents.findIndex((patent) => patent.id === action.payload.id),
        1
      );
    },
    addRecommendation: (state, action: PayloadAction<Recommendation>) => {
      state.recommendations.push(action.payload);
    },
    updateRecommendation: (state, action: PayloadAction<Recommendation>) => {
      const index = state.recommendations.findIndex(
        (rec) => rec.id === action.payload.id
      );
      if (index !== -1) state.recommendations[index] = action.payload;
    },
    deleteRecommendation: (state, action: PayloadAction<Recommendation>) => {
      state.recommendations.splice(
        state.recommendations.findIndex((rec) => rec.id === action.payload.id),
        1
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileAdapter.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log(action.payload);
        Object.assign(state, action.payload);
      })
      .addCase(logout, (state, action) => {
        Object.assign(state, { ...initialState, userId: null, _id: null });
      });
  },
});

export const {
  updateProfile,
  addContact,
  addJob,
  addSkill,
  addPublication,
  addCertificate,
  addCourse,
  addEducation,
  addHonor,
  addLanguage,
  addPatent,
  addProject,
  addRecommendation,
  addVolunteer,
  updateContact,
  updateJob,
  updateEducation,
  updateSkill,
  updateCertificate,
  updateCourse,
  updateHonor,
  updateLanguage,
  updatePatent,
  updateProject,
  updatePublication,
  updateRecommendation,
  updateVolunteer,
  deleteCertificate,
  deleteCourse,
  deleteEducation,
  deleteHonor,
  deleteJob,
  deleteLanguage,
  deletePatent,
  deleteProject,
  deletePublication,
  deleteRecommendation,
  deleteSkill,
  deleteVolunteer,
} = profileSlice.actions;

export const getUserProfile = profileAdapter;
export default profileSlice.reducer;
