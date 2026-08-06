import { Request, Response, NextFunction } from 'express'
import { workspaceService } from '../services/workspace.service'
import { AppError } from '../middleware/errorHandler'

export class WorkspaceController {
  async getWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401)
      }
      const data = await workspaceService.getWorkspaceData(req.user._id.toString(), req.user.role as any)
      
      res.status(200).json({
        success: true,
        data,
      })
    } catch (error) {
      next(error)
    }
  }
}

export const workspaceController = new WorkspaceController()
