import { useState, FormEvent, useEffect } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setDirection('forward');
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setStep(prev => prev + 1);
      setIsTransitioning(false);
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

  const handleBack = async () => {
    setDirection('backward');
    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setStep(prev => prev - 1);
    setIsTransitioning(false);
  };

  const getStepClassName = () => {
    const baseClass = 'form-step';
    if (!isTransitioning) return baseClass;
    return direction === 'forward' 
      ? `${baseClass} form-step-exit-active`
      : `${baseClass} form-step-enter-active`;
  };

  const renderStep = () => {
    const stepClass = getStepClassName();
    
    switch (step) {
      case 1:
        return (
          <div className={stepClass} data-testid="step-1">
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
                placeholder="Enter your first name"
                data-testid="firstName-input"
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
                placeholder="Enter your last name"
                data-testid="lastName-input"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className={stepClass} data-testid="step-2">
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
                placeholder="Enter your email address"
                data-testid="email-input"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={stepClass} data-testid="step-3">
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
                data-testid="role-input"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="onboarding-container" data-testid="onboarding-container">
        <div className="step-indicator" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`step ${step === num ? 'active' : ''} ${
                step > num ? 'completed' : ''
              }`}
              data-testid={`step-indicator-${num}`}
              aria-label={`Step ${num} ${step === num ? '(current)' : step > num ? '(completed)' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} data-testid="user-create-form">
          {renderStep()}
          <div className="button-group">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary"
                data-testid="back-button"
              >
                Back
              </button>
            )}
            <button type="submit" className="btn btn-primary" data-testid="next-button">
              {step === 3 ? 'Complete' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}