import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, GitBranch, Star, Eye, ExternalLink } from 'lucide-react'

const GitHubSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [githubData, setGithubData] = useState({
    user: null,
    repos: [],
    stats: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/buzzbrain-dev')
        if (!userResponse.ok) throw new Error('Failed to fetch user data')
        const userData = await userResponse.ok ? await userResponse.json() : null

        // Fetch repos
        const reposResponse = await fetch('https://api.github.com/users/buzzbrain-dev/repos?sort=updated&per_page=4')
        if (!reposResponse.ok) throw new Error('Failed to fetch repos')
        const reposData = await reposResponse.ok ? await reposResponse.json() : []

        // Create stats object based on repos
        const stats = {
          totalStars: reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0),
          totalForks: reposData.reduce((acc, repo) => acc + repo.forks_count, 0),
          totalWatchers: reposData.reduce((acc, repo) => acc + repo.watchers_count, 0),
          languages: {}
        }

        // Extract languages from repos
        for (const repo of reposData) {
          if (repo.language) {
            if (stats.languages[repo.language]) {
              stats.languages[repo.language]++
            } else {
              stats.languages[repo.language] = 1
            }
          }
        }

        setGithubData({
          user: userData,
          repos: reposData,
          stats,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        setGithubData({
          user: null,
          repos: [],
          stats: null,
          loading: false,
          error: error.message
        })
      }
    }

    fetchGitHubData()
  }, [])

  // Color map for language badges
  const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    PHP: '#4F5D95',
    Ruby: '#701516',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    Solidity: '#AA6746',
  }

  return (
    <section id="github" className="section-padding bg-neutral-50 dark:bg-neutral-800/30" ref={ref}>
      <div className="container-default">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-4">
            Open Source
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Explore my open source contributions and projects on GitHub
          </p>
        </motion.div>

        {githubData.loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        )}

        {githubData.error && (
          <div className="text-center py-12">
            <p className="text-error-500 mb-4">Failed to load GitHub data: {githubData.error}</p>
            <p className="text-neutral-600 dark:text-neutral-400">Please check back later or visit my GitHub profile directly</p>
            <motion.a
              href="https://github.com/buzzbrain-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-4 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} className="mr-2" /> Visit GitHub Profile
            </motion.a>
          </div>
        )}

        {!githubData.loading && !githubData.error && githubData.user && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* GitHub Profile Card */}
            <motion.div
              className="card p-6 lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                <img 
                  src={githubData.user.avatar_url || 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'} 
                  alt="GitHub Avatar" 
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{githubData.user.name || githubData.user.login}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">@{githubData.user.login}</p>
                
                <div className="flex justify-center gap-8 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold gradient-text">{githubData.user.public_repos}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Repos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold gradient-text">{githubData.user.followers}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold gradient-text">{githubData.stats?.totalStars || 0}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Stars</p>
                  </div>
                </div>
                
                {githubData.user.bio && (
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">{githubData.user.bio}</p>
                )}
                
                <motion.a
                  href={githubData.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} className="mr-2" /> View Profile
                </motion.a>
              </div>
              
              {/* Language Stats */}
              {githubData.stats && Object.keys(githubData.stats.languages).length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Top Languages</h4>
                  <div className="space-y-3">
                    {Object.entries(githubData.stats.languages)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([language, count]) => (
                        <div key={language} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: languageColors[language] || '#8e8e8e' }}
                          ></div>
                          <span className="text-neutral-800 dark:text-neutral-200 mr-2">{language}</span>
                          <div className="flex-grow h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: languageColors[language] || '#8e8e8e' }}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${(count / Object.values(githubData.stats.languages).reduce((a, b) => a + b, 0)) * 100}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Latest Repositories */}
            <motion.div
              className="card p-6 lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6">Latest Repositories</h3>
              <div className="space-y-6">
                {githubData.repos.map((repo, index) => (
                  <motion.div 
                    key={repo.id}
                    className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:border-primary-500 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium">
                        <a 
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-500 transition-colors"
                        >
                          {repo.name}
                        </a>
                      </h4>
                      <div className="flex space-x-3 text-neutral-600 dark:text-neutral-400">
                        <span className="flex items-center text-sm">
                          <Star size={16} className="mr-1" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center text-sm">
                          <GitBranch size={16} className="mr-1" /> {repo.forks_count}
                        </span>
                        <span className="flex items-center text-sm">
                          <Eye size={16} className="mr-1" /> {repo.watchers_count}
                        </span>
                      </div>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                      {repo.description || 'No description provided'}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {repo.language && (
                          <span className="flex items-center text-sm">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: languageColors[repo.language] || '#8e8e8e' }}
                            ></div>
                            {repo.language}
                          </span>
                        )}
                      </div>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          Live Demo <ExternalLink size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <motion.a
                  href={`https://github.com/${githubData.user.login}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Repositories <ExternalLink size={18} className="ml-2" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GitHubSection