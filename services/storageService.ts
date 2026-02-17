
import { Form, FormResponse } from '../types';

const FORMS_KEY = 'exp_eval_forms';
const RESPONSES_KEY = 'exp_eval_responses';

export const storageService = {
  getForms: (): Form[] => {
    const data = localStorage.getItem(FORMS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveForm: (form: Form) => {
    const forms = storageService.getForms();
    const index = forms.findIndex(f => f.id === form.id);
    if (index >= 0) {
      forms[index] = form;
    } else {
      forms.push(form);
    }
    localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
  },

  deleteForm: (id: string) => {
    const forms = storageService.getForms().filter(f => f.id !== id);
    localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
    // Also cleanup responses
    const responses = storageService.getResponses().filter(r => r.formId !== id);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
  },

  getResponses: (): FormResponse[] => {
    const data = localStorage.getItem(RESPONSES_KEY);
    return data ? JSON.parse(data) : [];
  },

  getResponsesForForm: (formId: string): FormResponse[] => {
    return storageService.getResponses().filter(r => r.formId === formId);
  },

  saveResponse: (response: FormResponse) => {
    const responses = storageService.getResponses();
    responses.push(response);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
  }
};
