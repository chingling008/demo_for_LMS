import { useState } from 'react';
import Modal from './Modal';
import { Upload, FileText, CheckCircle } from 'lucide-react';

const AssignmentSubmitModal = ({ isOpen, onClose, assignment, onSubmit }) => {
  const [submissionText, setSubmissionText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      assignmentId: assignment.id,
      content: submissionText,
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubmissionText('');
      onClose();
    }, 2000);
  };

  if (!assignment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={assignment.title} size="lg">
      {submitted ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Submitted Successfully!</h3>
          <p className="text-slate-600">Your assignment has been submitted for grading.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assignment Details */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Course:</span>
                <p className="font-medium text-slate-900">{assignment.course}</p>
              </div>
              <div>
                <span className="text-slate-600">Due Date:</span>
                <p className="font-medium text-slate-900">{assignment.dueDate}</p>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload Files (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500">
                PDF, DOC, DOCX up to 10MB
              </p>
            </div>
          </div>

          {/* Text Submission */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Submission Text
            </label>
            <textarea
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your solution, answer, or description here..."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FileText size={18} />
              Submit Assignment
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AssignmentSubmitModal;
