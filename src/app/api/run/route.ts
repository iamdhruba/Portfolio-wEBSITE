import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  try {
    const { repoUrl, projectId } = await req.json();

    if (!repoUrl || !projectId) {
      return NextResponse.json({ error: 'Missing repoUrl or projectId' }, { status: 400 });
    }

    // Define a directory for clones (in the user's home or project root)
    // We'll use a 'cloned_projects' folder in the current workspace
    const targetDir = path.join(process.cwd(), 'cloned_projects', projectId);

    // Ensure the parent directory exists
    if (!fs.existsSync(path.join(process.cwd(), 'cloned_projects'))) {
      fs.mkdirSync(path.join(process.cwd(), 'cloned_projects'));
    }

    // Check if project already cloned
    if (fs.existsSync(targetDir)) {
      // Just open VS Code if already exists
      exec(`code "${targetDir}"`, (err) => {
        if (err) console.error('Error opening VS Code:', err);
      });
      return NextResponse.json({ message: 'Project already exists, opening in VS Code' });
    }

    // Clone, then open VS Code, using a visible terminal so the user sees progress
    // This solves the 'taking so much time' issue by providing instant visual feedback
    const isWindows = process.platform === 'win32';
    const command = isWindows 
      ? `start cmd.exe /c "title Cloning ${projectId}... && echo Starting clone for ${projectId}... && echo. && git clone ${repoUrl} "${targetDir}" && echo. && echo Clone complete! Opening VS Code... && code "${targetDir}""`
      : `git clone ${repoUrl} "${targetDir}" && code "${targetDir}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
    });

    return NextResponse.json({ 
      message: 'Clone initiated. Opening in VS Code shortly.',
      path: targetDir
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
