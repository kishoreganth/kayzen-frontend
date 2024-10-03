import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { upsertAction } from '@/store/reducers/phoneAgentSlice'; 
import 'react-quill/dist/quill.snow.css'; 
import ReactQuill from 'react-quill'; 
import { v4 as uuidv4 } from 'uuid';

const actions = [
  { id: 1, name: 'Send email', fields: ['Name', 'Subject', 'Instructions', 'Content'] },
  { id: 2, name: 'Call Forwarding', fields: ['Name', 'Forward To:', 'Instructions'] },
];

// Mapping fields to help text
const fieldHelpText = {
  Name: "Give this integration a name.",
  Subject: "Give this integration a subject.",
  'Forward To:': "Tell your agent where to forward your call.",
  Instructions: "Tell your agent when this action should be triggered.",
  Content: "Provide the main content or body of the email."
};

function ActionForm({ show, toggle, initialData }) {
  const dispatch = useDispatch();
  const [selectedAction, setSelectedAction] = useState(actions[0]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [editorContent, setEditorContent] = useState(formData.Content || ''); // State for Quill editor

  useEffect(() => {
    if (initialData) {
      setSelectedAction(actions.find(action => action.name === initialData.type));
      setFormData(initialData);
      setEditorContent(initialData.Content || ''); // Initialize editor content
    } else {
      setSelectedAction(actions[0]);
      setFormData({});
      setEditorContent(''); // Reset editor content
    }
  }, [initialData]);

  const handleActionChange = (e) => {
    const actionId = parseInt(e.target.value);
    const action = actions.find(action => action.id === actionId);
    setSelectedAction(action);
    setFormData({});
    setErrors({});
    setEditorContent(''); // Reset editor content on action change
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
    setFormData({
      ...formData,
      Content: content
    });
  };

  const validateForm = () => {
    const newErrors = {};
    selectedAction.fields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required.';
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let actionData;
    if(initialData){
      actionData = {
        id: initialData.id,
        type: selectedAction.name,
        ...formData
    }
   } else{
      actionData = {
        id: uuidv4(),
        type: selectedAction.name,
        ...formData
      }
    }


    // const actionData = {
    //   type: selectedAction.name,
    //   ...formData
    // };

    dispatch(upsertAction(actionData));
    toggle(); // Close the form after submission
    setFormData({});
    setErrors({});
    setEditorContent(''); // Reset editor content on submit
  };

  return (
    <div className="p-5 max-h-[80vh] overflow-y-auto scr">
      <h2 className="text-xl font-semibold mb-4">Action Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="action-type" className="block text-sm font-medium text-gray-700">Action Type</label>
          <select
            id="action-type"
            value={selectedAction.id}
            onChange={handleActionChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {actions.map(action => (
              <option key={action.id} value={action.id}>{action.name}</option>
            ))}
          </select>
        </div>

        {selectedAction.fields.map((field, index) => (
          <div key={index} className="mt-4">
            <label htmlFor={field} className="block mt-[1vw] text-sm font-medium text-gray-700">{field}</label>
            <p className="text-xs text-gray-500">{fieldHelpText[field]}</p>
            {field === 'Instructions' ? (
              <textarea
                name={field}
                id={field}
                value={formData[field] || ''}
                className={`w-full h-[6vw] rounded-md mt-[.5vw] border-[.5px] border-zinc-300 focus:border-zinc-500 px-[.5vw] py-[.5vw] ${errors[field] ? 'border-red-500' : ''}`}
                onChange={handleChange}
              />
            ) : field === 'Content' ? (
              <ReactQuill
                name={field}
                value={editorContent}
                onChange={handleEditorChange}
                placeholder='Start typing...'
                className={`ed mt-[.5vw] border-[.5px] h-[9vw] border-zinc-300 focus:border-zinc-500 ${errors[field] ? 'border-red-500' : ''}`}
              />
            ) : (
              <input
                type="text"
                name={field}
                id={field}
                placeholder='Ex: Pizza menu action'
                value={formData[field] || ''}
                className={`w-full rounded-md mt-[.5vw] border-[.5px] border-zinc-300 focus:border-zinc-500 px-[.5vw] py-[.5vw] ${errors[field] ? 'border-red-500' : ''}`}
                onChange={handleChange}
              />
            )}
            {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
          </div>
        ))}
        <div className='flex items-center justify-end gap-[1vw] mt-[4vw]'>
          <button type="button" onClick={toggle} className="bg-gray-300 px-4 py-2 rounded ">
            Cancel
          </button>

          <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded '>
            {initialData ? 'Update Action' : 'Create New Action'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActionForm;