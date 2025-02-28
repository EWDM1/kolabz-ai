
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Layout, 
  Type, 
  Image, 
  ListOrdered,
  Heading, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  ArrowUp, 
  ArrowDown, 
  Trash, 
  Plus,
  Settings,
  Eye,
  FileText,
  Search,
  Pencil,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types for our page builder blocks
type BlockType = 'hero' | 'text' | 'image' | 'features' | 'cta' | 'testimonial';

interface Block {
  id: string;
  type: BlockType;
  content: Record<string, any>;
}

const LandingPageEditor = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // State for page builder
  const [pageTitle, setPageTitle] = useState("Homepage");
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "hero-1",
      type: "hero",
      content: {
        heading: "Welcome to Our Platform",
        subheading: "The best solution for your business needs",
        ctaText: "Get Started",
        ctaLink: "/signup",
        imageUrl: "/placeholder.svg"
      }
    },
    {
      id: "features-1",
      type: "features",
      content: {
        heading: "Our Features",
        items: [
          { title: "Easy to Use", description: "Simple interface that anyone can use" },
          { title: "Powerful Tools", description: "Advanced tools for professional results" },
          { title: "24/7 Support", description: "We're always here to help you" }
        ]
      }
    },
    {
      id: "cta-1",
      type: "cta",
      content: {
        heading: "Ready to get started?",
        text: "Join thousands of satisfied customers today.",
        buttonText: "Sign Up Now",
        buttonLink: "/signup"
      }
    }
  ]);
  
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // Get the currently selected block
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);
  
  // Generate a unique ID for new blocks
  const generateBlockId = (type: BlockType) => {
    const existingBlocksOfType = blocks.filter(block => block.type === type).length;
    return `${type}-${existingBlocksOfType + 1}`;
  };
  
  // Add a new block to the page
  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: generateBlockId(type),
      type,
      content: getDefaultContentForType(type)
    };
    
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setUnsavedChanges(true);
    
    toast({
      title: "Block added",
      description: `Added a new ${type} block to your page`
    });
  };
  
  // Get default content for a new block based on type
  const getDefaultContentForType = (type: BlockType): Record<string, any> => {
    switch (type) {
      case 'hero':
        return {
          heading: "Your Headline Here",
          subheading: "A compelling subheading to support your headline",
          ctaText: "Click Here",
          ctaLink: "#",
          imageUrl: "/placeholder.svg"
        };
      case 'text':
        return {
          heading: "Section Title",
          content: "Enter your text content here. This is a paragraph that you can edit."
        };
      case 'image':
        return {
          imageUrl: "/placeholder.svg",
          caption: "Image caption",
          altText: "Descriptive alt text"
        };
      case 'features':
        return {
          heading: "Features",
          items: [
            { title: "Feature 1", description: "Description of feature 1" },
            { title: "Feature 2", description: "Description of feature 2" }
          ]
        };
      case 'cta':
        return {
          heading: "Call to Action",
          text: "Encourage your visitors to take action",
          buttonText: "Click Here",
          buttonLink: "#"
        };
      case 'testimonial':
        return {
          quote: "This is the best product I've ever used!",
          author: "Jane Doe",
          position: "CEO, Company",
          imageUrl: "/placeholder.svg"
        };
      default:
        return {};
    }
  };
  
  // Update a block's content
  const updateBlockContent = (id: string, contentUpdates: Record<string, any>) => {
    setBlocks(blocks.map(block => 
      block.id === id 
        ? { ...block, content: { ...block.content, ...contentUpdates } } 
        : block
    ));
    setUnsavedChanges(true);
  };
  
  // Delete a block
  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    setSelectedBlockId(null);
    setUnsavedChanges(true);
    
    toast({
      title: "Block deleted",
      description: "The block has been removed from your page"
    });
  };
  
  // Move a block up or down
  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const currentIndex = blocks.findIndex(block => block.id === id);
    if (currentIndex < 0) return;
    
    const newBlocks = [...blocks];
    const newIndex = direction === 'up' 
      ? Math.max(0, currentIndex - 1) 
      : Math.min(blocks.length - 1, currentIndex + 1);
    
    if (newIndex === currentIndex) return;
    
    // Swap the blocks
    [newBlocks[currentIndex], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[currentIndex]];
    
    setBlocks(newBlocks);
    setUnsavedChanges(true);
  };
  
  // Save the page
  const savePage = () => {
    // In a real app, this would make an API call to save the data
    console.log("Saving page:", { title: pageTitle, blocks });
    
    toast({
      title: "Page saved",
      description: "Your changes have been saved successfully"
    });
    
    setUnsavedChanges(false);
  };
  
  // Render a preview of a block based on its type
  const renderBlockPreview = (block: Block) => {
    const isSelected = block.id === selectedBlockId;
    
    const blockPreviewContent = () => {
      switch (block.type) {
        case 'hero':
          return (
            <div className="text-center p-4">
              <h2 className="text-2xl font-bold">{block.content.heading}</h2>
              <p className="my-2">{block.content.subheading}</p>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
                {block.content.ctaText}
              </button>
              {block.content.imageUrl && (
                <div className="mt-4 flex justify-center">
                  <img 
                    src={block.content.imageUrl} 
                    alt="Hero" 
                    className="h-32 object-cover rounded" 
                  />
                </div>
              )}
            </div>
          );
        case 'text':
          return (
            <div className="p-4">
              {block.content.heading && <h3 className="text-xl font-bold mb-2">{block.content.heading}</h3>}
              <p>{block.content.content}</p>
            </div>
          );
        case 'image':
          return (
            <div className="p-4 text-center">
              <img 
                src={block.content.imageUrl} 
                alt={block.content.altText} 
                className="max-h-48 mx-auto rounded" 
              />
              {block.content.caption && <p className="text-sm mt-2 text-muted-foreground">{block.content.caption}</p>}
            </div>
          );
        case 'features':
          return (
            <div className="p-4">
              <h3 className="text-xl font-bold mb-4 text-center">{block.content.heading}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {block.content.items.map((item: any, i: number) => (
                  <div key={i} className="border rounded p-3">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'cta':
          return (
            <div className="p-4 text-center bg-muted/50 rounded">
              <h3 className="text-xl font-bold">{block.content.heading}</h3>
              <p className="my-2">{block.content.text}</p>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded mt-2">
                {block.content.buttonText}
              </button>
            </div>
          );
        case 'testimonial':
          return (
            <div className="p-4 flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img 
                  src={block.content.imageUrl} 
                  alt={block.content.author} 
                  className="h-16 w-16 rounded-full object-cover" 
                />
              </div>
              <div>
                <p className="italic">"{block.content.quote}"</p>
                <p className="font-bold mt-2">{block.content.author}</p>
                <p className="text-sm text-muted-foreground">{block.content.position}</p>
              </div>
            </div>
          );
        default:
          return <div>Unknown block type</div>;
      }
    };
    
    return (
      <div 
        className={`border rounded-md mb-4 transition-all ${
          isSelected ? 'ring-2 ring-primary' : 'hover:border-primary/50'
        }`}
        onClick={() => setSelectedBlockId(block.id)}
      >
        <div className="border-b bg-muted/40 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            {getIconForBlockType(block.type)}
            <span className="capitalize">{block.type}</span>
          </div>
          
          {!previewMode && (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  moveBlock(block.id, 'up');
                }}
                disabled={blocks.indexOf(block) === 0}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  moveBlock(block.id, 'down');
                }}
                disabled={blocks.indexOf(block) === blocks.length - 1}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBlock(block.id);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className={previewMode ? "" : "opacity-80"}>
          {blockPreviewContent()}
        </div>
      </div>
    );
  };
  
  // Get an icon component based on block type
  const getIconForBlockType = (type: BlockType) => {
    switch (type) {
      case 'hero':
        return <Layout className="h-4 w-4" />;
      case 'text':
        return <Type className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'features':
        return <ListOrdered className="h-4 w-4" />;
      case 'cta':
        return <FileText className="h-4 w-4" />;
      case 'testimonial':
        return <AlignLeft className="h-4 w-4" />;
      default:
        return <Layout className="h-4 w-4" />;
    }
  };
  
  // Render the block editor based on the selected block type
  const renderBlockEditor = () => {
    if (!selectedBlock) return null;
    
    switch (selectedBlock.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-heading">Heading</Label>
              <Input 
                id="hero-heading" 
                value={selectedBlock.content.heading} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { heading: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="hero-subheading">Subheading</Label>
              <Textarea 
                id="hero-subheading" 
                value={selectedBlock.content.subheading} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { subheading: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hero-cta-text">Button Text</Label>
                <Input 
                  id="hero-cta-text" 
                  value={selectedBlock.content.ctaText} 
                  onChange={(e) => updateBlockContent(selectedBlock.id, { ctaText: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="hero-cta-link">Button Link</Label>
                <Input 
                  id="hero-cta-link" 
                  value={selectedBlock.content.ctaLink} 
                  onChange={(e) => updateBlockContent(selectedBlock.id, { ctaLink: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="hero-image-url">Image URL</Label>
              <Input 
                id="hero-image-url" 
                value={selectedBlock.content.imageUrl} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { imageUrl: e.target.value })}
              />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-heading">Heading (Optional)</Label>
              <Input 
                id="text-heading" 
                value={selectedBlock.content.heading} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { heading: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="text-content">Content</Label>
              <Textarea 
                id="text-content" 
                value={selectedBlock.content.content} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { content: e.target.value })}
                rows={6}
              />
            </div>
            
            <div>
              <Label>Text Alignment</Label>
              <div className="flex gap-2 mt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => updateBlockContent(selectedBlock.id, { alignment: 'left' })}
                  className={selectedBlock.content.alignment === 'left' ? 'bg-primary/10' : ''}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => updateBlockContent(selectedBlock.id, { alignment: 'center' })}
                  className={selectedBlock.content.alignment === 'center' ? 'bg-primary/10' : ''}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => updateBlockContent(selectedBlock.id, { alignment: 'right' })}
                  className={selectedBlock.content.alignment === 'right' ? 'bg-primary/10' : ''}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <Input 
                id="image-url" 
                value={selectedBlock.content.imageUrl} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { imageUrl: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input 
                id="image-alt" 
                value={selectedBlock.content.altText} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { altText: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="image-caption">Caption (Optional)</Label>
              <Input 
                id="image-caption" 
                value={selectedBlock.content.caption} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { caption: e.target.value })}
              />
            </div>
            
            <div>
              <Label>Image Size</Label>
              <Select 
                value={selectedBlock.content.size || 'medium'} 
                onValueChange={(value) => updateBlockContent(selectedBlock.id, { size: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="full">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="features-heading">Heading</Label>
              <Input 
                id="features-heading" 
                value={selectedBlock.content.heading} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { heading: e.target.value })}
              />
            </div>
            
            <div className="space-y-4">
              <Label>Features</Label>
              {selectedBlock.content.items.map((item: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`feature-${index}-title`}>Feature {index + 1}</Label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          const newItems = [...selectedBlock.content.items];
                          newItems.splice(index, 1);
                          updateBlockContent(selectedBlock.id, { items: newItems });
                        }}
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Input 
                      id={`feature-${index}-title`} 
                      placeholder="Feature title"
                      value={item.title} 
                      onChange={(e) => {
                        const newItems = [...selectedBlock.content.items];
                        newItems[index] = { ...newItems[index], title: e.target.value };
                        updateBlockContent(selectedBlock.id, { items: newItems });
                      }}
                    />
                    
                    <Textarea 
                      placeholder="Feature description"
                      value={item.description} 
                      onChange={(e) => {
                        const newItems = [...selectedBlock.content.items];
                        newItems[index] = { ...newItems[index], description: e.target.value };
                        updateBlockContent(selectedBlock.id, { items: newItems });
                      }}
                      rows={2}
                    />
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                variant="outline" 
                onClick={() => {
                  const newItems = [...selectedBlock.content.items, { title: "New Feature", description: "Description of this feature" }];
                  updateBlockContent(selectedBlock.id, { items: newItems });
                }}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Feature
              </Button>
            </div>
          </div>
        );
      
      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cta-heading">Heading</Label>
              <Input 
                id="cta-heading" 
                value={selectedBlock.content.heading} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { heading: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="cta-text">Text</Label>
              <Textarea 
                id="cta-text" 
                value={selectedBlock.content.text} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { text: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cta-button-text">Button Text</Label>
                <Input 
                  id="cta-button-text" 
                  value={selectedBlock.content.buttonText} 
                  onChange={(e) => updateBlockContent(selectedBlock.id, { buttonText: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="cta-button-link">Button Link</Label>
                <Input 
                  id="cta-button-link" 
                  value={selectedBlock.content.buttonLink} 
                  onChange={(e) => updateBlockContent(selectedBlock.id, { buttonLink: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="cta-full-width"
                checked={selectedBlock.content.fullWidth || false}
                onCheckedChange={(checked) => updateBlockContent(selectedBlock.id, { fullWidth: checked })}
              />
              <Label htmlFor="cta-full-width">Full Width</Label>
            </div>
          </div>
        );
      
      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="testimonial-quote">Quote</Label>
              <Textarea 
                id="testimonial-quote" 
                value={selectedBlock.content.quote} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { quote: e.target.value })}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="testimonial-author">Author Name</Label>
              <Input 
                id="testimonial-author" 
                value={selectedBlock.content.author} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { author: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="testimonial-position">Position/Company</Label>
              <Input 
                id="testimonial-position" 
                value={selectedBlock.content.position} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { position: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="testimonial-image">Author Image URL</Label>
              <Input 
                id="testimonial-image" 
                value={selectedBlock.content.imageUrl} 
                onChange={(e) => updateBlockContent(selectedBlock.id, { imageUrl: e.target.value })}
              />
            </div>
          </div>
        );
      
      default:
        return <div>Select a block to edit its content</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col w-full">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4">
          <div className="flex items-center mb-6 gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-xl font-semibold">Landing Page Editor</h1>
            
            <div className="flex items-center gap-2 ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPreviewMode(!previewMode)}
                className="gap-1"
              >
                {previewMode ? (
                  <>
                    <Pencil className="h-4 w-4" />
                    Edit Mode
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Preview
                  </>
                )}
              </Button>
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={savePage}
                disabled={!unsavedChanges}
                className="gap-1"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-lg border p-4">
                <Label htmlFor="page-title">Page Title</Label>
                <div className="relative">
                  <Input 
                    id="page-title" 
                    value={pageTitle} 
                    onChange={(e) => {
                      setPageTitle(e.target.value);
                      setUnsavedChanges(true);
                    }} 
                    className="text-lg font-medium pr-10"
                  />
                  <RefreshCw className="h-4 w-4 absolute right-3 top-3 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This is used for internal reference and SEO. It doesn't appear on the page.
                </p>
              </div>
              
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Page Content</h2>
                  
                  {!previewMode && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="gap-1">
                          <Plus className="h-4 w-4" />
                          Add Block
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => addBlock('hero')}>
                          <Layout className="h-4 w-4 mr-2" />
                          Hero Section
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock('text')}>
                          <Type className="h-4 w-4 mr-2" />
                          Text Block
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock('image')}>
                          <Image className="h-4 w-4 mr-2" />
                          Image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock('features')}>
                          <ListOrdered className="h-4 w-4 mr-2" />
                          Features
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock('cta')}>
                          <FileText className="h-4 w-4 mr-2" />
                          Call to Action
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addBlock('testimonial')}>
                          <AlignLeft className="h-4 w-4 mr-2" />
                          Testimonial
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                
                <div className="space-y-4">
                  {blocks.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-md">
                      <p className="text-muted-foreground">No content blocks yet</p>
                      <Button 
                        variant="outline" 
                        onClick={() => addBlock('hero')} 
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Block
                      </Button>
                    </div>
                  ) : (
                    blocks.map(block => renderBlockPreview(block))
                  )}
                </div>
              </div>
            </div>
            
            {/* Editor sidebar */}
            <div className="space-y-4">
              <div className="bg-card rounded-lg border">
                <div className="border-b p-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Block Editor
                  </h3>
                </div>
                
                <div className="p-4">
                  {selectedBlockId ? (
                    renderBlockEditor()
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Select a block to edit</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  SEO Settings
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input id="meta-title" placeholder="SEO Title" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 50-60 characters
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea id="meta-description" placeholder="Brief description for search results" rows={3} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 120-155 characters
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Page Settings
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="page-published" defaultChecked />
                    <Label htmlFor="page-published">Published</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="index-page" defaultChecked />
                    <Label htmlFor="index-page">Allow search engines to index</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPageEditor;
