import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const CTASection = () => {
  const navigate = useNavigate();
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/apply');
    window.scrollTo(0, 0);
  };
  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/pricing');
    window.scrollTo(0, 0);
  };
  return;
};
export default CTASection;