            {/* Demo Credentials — conditional */}
            {display?.demo_credentials && (
              <div className="bg-card-bg p-6 rounded-3xl border border-main/20 shadow-sm">
                <h3 className="text-xl font-bold mb-1 text-text">
                  {currentLang === "ar" ? "بيانات الدخول" : "Demo Accounts"}
                </h3>
                <p className="text-sm text-text/70 mb-4">
                  {display.demo_credentials.note}
                </p>
                <div className="space-y-3">
                  {display.demo_credentials.accounts.map((account) => (
                    <div
                      key={account.role}
                      className="bg-bg rounded-2xl px-4 py-3 border border-sideBG/10"
                    >
                      <span className="text-xs uppercase tracking-widest font-bold text-main block mb-2">
                        {account.role}
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-text/80 break-all">
                          {account.email}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(account.email)}
                          title="Copy email"
                          className="shrink-0 p-1.5 rounded-lg text-text/50 hover:text-main hover:bg-main/10 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Password row */}
                <div className="mt-4 border-t border-sideBG/10 pt-3 flex items-center justify-between gap-2">
                  <p className="text-sm text-text/70">
                    {currentLang === "ar"
                      ? "كلمة المرور: "
                      : "Password: "}
                    <span className="font-bold text-main">
                      Ahmed#
                    </span>
                  </p>
                  <button
                    onClick={() => navigator.clipboard.writeText("Ahmed#")}
                    title="Copy password"
                    className="shrink-0 p-1.5 rounded-lg text-text/50 hover:text-main hover:bg-main/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
