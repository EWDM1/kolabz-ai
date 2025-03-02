import { createI18n } from "@/lib/i18n";

const translations = {
  // Common
  "app.name": "Kolabz",
  "app.tagline": "AI Prompt Engineering Platform",
  
  // Navigation
  "nav.home": "Home",
  "nav.features": "Features",
  "nav.pricing": "Pricing",
  "nav.blog": "Blog",
  "nav.login": "Login",
  "nav.signup": "Sign Up",
  "nav.dashboard": "Dashboard",
  "nav.my_prompts": "My Prompts",
  "nav.settings": "Settings",
  "nav.logout": "Logout",
  
  // Hero Section
  "hero.title": "Craft Perfect AI Prompts",
  "hero.subtitle": "Optimize your AI interactions with our prompt engineering platform",
  "hero.cta.primary": "Get Started",
  "hero.cta.secondary": "Learn More",
  
  // Features Section
  "features.title": "Powerful Features",
  "features.subtitle": "Everything you need to create effective AI prompts",
  "features.optimize.title": "Prompt Optimization",
  "features.optimize.description": "Refine your prompts for better AI responses",
  "features.library.title": "Prompt Library",
  "features.library.description": "Save and organize your best prompts",
  "features.templates.title": "Templates",
  "features.templates.description": "Start with proven prompt structures",
  "features.export.title": "Easy Export",
  "features.export.description": "Use your prompts on any AI platform",
  
  // Pricing
  "pricing.title": "Simple, transparent pricing",
  "pricing.description": "Choose the plan that's right for you. All plans include a 7-day free trial.",
  "pricing.toggle.monthly": "Monthly",
  "pricing.toggle.annual": "Annual",
  "pricing.save": "Save 16%",
  "pricing.save_amount": "Save",
  "pricing.most_popular": "Most Popular",
  "pricing.disclaimer": "All plans include a 7-day free trial. Cancel anytime. If you're not satisfied, contact us within 30 days for a full refund.",
  "pricing.cta.subscribe": "Subscribe Now",
  "pricing.cta.contact": "Contact Sales",
  
  "pricing.free.name": "Free Trial",
  "pricing.free.description": "Test drive Kolabz with limited features",
  
  "pricing.pro.name": "Pro",
  "pricing.pro.description": "Perfect for individual creators and professionals",
  "pricing.savings.pro": "$20/year",
  
  "pricing.team.name": "Team",
  "pricing.team.description": "Ideal for teams and businesses",
  "pricing.savings.team": "$48/year",
  
  "pricing.features.optimizations": "5 prompt optimizations",
  "pricing.features.save": "Save up to 5 prompts",
  "pricing.features.templates": "Access to basic templates",
  "pricing.features.collaboration": "Team collaboration",
  "pricing.features.unlimited_opt": "Unlimited prompt optimizations",
  "pricing.features.unlimited_lib": "Unlimited prompt library",
  "pricing.features.all_templates": "Access to all templates",
  "pricing.features.export": "1-click export to any platform",
  "pricing.features.priority": "Priority support",
  "pricing.features.everything": "Everything in Pro",
  "pricing.features.workspaces": "Team workspaces",
  "pricing.features.collab_features": "Collaboration features",
  "pricing.features.custom": "Custom templates",
  "pricing.features.dedicated": "Dedicated support",
  
  // Auth
  "auth.login.title": "Welcome back",
  "auth.login.subtitle": "Enter your credentials to access your account",
  "auth.login.email": "Email",
  "auth.login.password": "Password",
  "auth.login.remember": "Remember me",
  "auth.login.forgot": "Forgot password?",
  "auth.login.button": "Sign In",
  "auth.login.or": "Or continue with",
  "auth.login.google": "Google",
  "auth.login.no_account": "Don't have an account?",
  "auth.login.signup": "Sign up",
  
  "auth.signup.title": "Create an account",
  "auth.signup.subtitle": "Enter your details to get started",
  "auth.signup.name": "Full Name",
  "auth.signup.email": "Email",
  "auth.signup.password": "Password",
  "auth.signup.confirm": "Confirm Password",
  "auth.signup.terms": "I agree to the Terms of Service and Privacy Policy",
  "auth.signup.button": "Sign Up",
  "auth.signup.or": "Or continue with",
  "auth.signup.google": "Google",
  "auth.signup.have_account": "Already have an account?",
  "auth.signup.login": "Sign in",
  
  // Dashboard
  "dashboard.welcome": "Welcome back",
  "dashboard.recent": "Recent Prompts",
  "dashboard.view_all": "View All",
  "dashboard.create_new": "Create New Prompt",
  "dashboard.no_prompts": "You haven't created any prompts yet",
  "dashboard.get_started": "Get started by creating your first prompt",
  
  // Prompts
  "prompts.my_prompts": "My Prompts",
  "prompts.create": "Create Prompt",
  "prompts.search": "Search prompts...",
  "prompts.filter": "Filter",
  "prompts.sort": "Sort",
  "prompts.no_results": "No prompts found",
  "prompts.try_again": "Try a different search term or clear filters",
  
  // Settings
  "settings.title": "Account Settings",
  "settings.profile": "Profile",
  "settings.subscription": "Subscription",
  "settings.billing": "Billing",
  "settings.notifications": "Notifications",
  "settings.security": "Security",
  "settings.save": "Save Changes",
  
  // Notifications
  "notifications.success": "Success",
  "notifications.error": "Error",
  "notifications.warning": "Warning",
  "notifications.info": "Information",
  
  // Logout
  "logout.title": "Logged out",
  "logout.description": "You have been successfully logged out",
  
  // Checkout
  "checkout.title": "Complete your purchase",
  "checkout.subtitle": "You're subscribing to the",
  "checkout.plan": "plan",
  "checkout.payment_method": "Payment method",
  "checkout.order_summary": "Order summary",
  "checkout.subscription": "Subscription",
  "checkout.billed_annually": "Billed annually",
  "checkout.billed_monthly": "Billed monthly",
  "checkout.total": "Total",
  "checkout.billed_annually_today": "You'll be billed today, and annually thereafter",
  "checkout.billed_monthly_today": "You'll be billed today, and monthly thereafter",
  "checkout.complete_purchase": "Complete purchase",
  "checkout.back": "Back",
  "checkout.agreement": "By completing your purchase, you agree to our Terms of Service and Privacy Policy.",
  "checkout.powered_by_stripe": "Payments securely processed by Stripe",
  "checkout.security_message": "Your payment information is securely processed by Stripe. We never store your full card details.",
  "checkout.test_mode": "Test Mode",
  "checkout.test_card": "Use test card: 4242 4242 4242 4242, any future date, any CVC",
  "checkout.processing": "Processing...",
  "checkout.payment_error": "Payment error",
  "checkout.card_error": "There was a problem with your card",
  "checkout.payment_method_added": "Payment method added",
  "checkout.ready_to_subscribe": "You're ready to subscribe",
  "checkout.add_payment_method": "Add payment method",
  "checkout.please_add_card": "Please add a payment method to continue",
  "checkout.no_plan_selected": "No plan selected",
  "checkout.please_select_plan": "Please select a subscription plan first",
  "checkout.subscription_active": "Subscription active",
  "checkout.welcome_message": "Welcome to Kolabz! Your subscription is now active.",
  "checkout.subscription_error": "Subscription error",
  "checkout.try_again": "There was a problem activating your subscription. Please try again.",
};

export const { t, locale, setLocale } = createI18n(translations);
