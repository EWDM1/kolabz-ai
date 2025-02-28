
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

const SupabaseConnectionTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to fetch health status directly
      const { error: healthError } = await supabase.auth.getSession();
      
      if (healthError) {
        throw healthError;
      }
      
      // If we get here, connection is successful
      setIsConnected(true);
    } catch (err) {
      console.error('Supabase connection error:', err);
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Status</CardTitle>
        <CardDescription>Checking if your Supabase project is properly connected</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <RefreshCw className="h-12 w-12 text-primary animate-spin mb-4" />
            <p>Testing connection...</p>
          </div>
        ) : isConnected === null ? (
          <p>Initializing connection test...</p>
        ) : isConnected ? (
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium text-green-600 dark:text-green-400">
              Connected to Supabase!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Your application is successfully connected to your Supabase project.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg font-medium text-red-600 dark:text-red-400">
              Connection Failed
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Could not connect to your Supabase project.
            </p>
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md text-sm overflow-auto max-w-full">
                <p className="font-mono">{error}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={checkConnection} 
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Test Connection Again
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseConnectionTest;
