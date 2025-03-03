import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  interests: string[];
}

interface UserCreateProps {
  onUserCreated: (user: UserFormData) => void;
}

export function UserCreate({ onUserCreated }: UserCreateProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    interests: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      onUserCreated(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        interests: []
      });
      setStep(1);
      navigate('/users');
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="welcome-message">
              <h1>Welcome!</h1>
              <p>Let's get started with creating your account. First, tell us about yourself.</p>
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="welcome-message">
              <h1>Contact Information</h1>
              <p>How can we reach you?</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="welcome-message">
              <h1>Final Steps</h1>
              <p>Tell us about your role and interests.</p>
            </div>
            <div className="form-group">
              <label htmlFor="role">Your Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Developer, Designer, Manager"
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="step-indicator">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`step ${step === num ? 'active' : ''} ${
              step > num ? 'completed' : ''
            }`}
          >
            {num}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="button-group">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-secondary"
            >
              Back
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {step === 3 ? 'Complete' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}